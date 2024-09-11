import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { BufferWriter } from './buffer-writer.class.js';


/**
 * BITMAP CLASS
 */
export class Bitmap {
	/** @type {Buffer} */
	pixels = null;
	/** @type {number} */
	width = 0;
	/** @type {number} */
	height = 0;
	/** @type {Buffer} */
	bmp = null;

	/**
	 * @param {Buffer} pixels 32 bit pixel buffer
	 * @param {number} width
	 * @param {number} height
	 */
	constructor(pixels, width, height) {
		this.pixels = pixels;
		this.width = width;
		this.height = height;
		this.bmp = Buffer.alloc(/* header size */ 54 + pixels.length, pixels.length);
	}

	encode = () => {
		const bufferWriter = new BufferWriter(this.bmp);
		bufferWriter.writeString('BM');
		bufferWriter.writeUInt32LE(/* header size */ 54 + this.pixels.length);
		bufferWriter.writeUInt32LE(/* reserved */ 0);
		bufferWriter.writeUInt32LE(/* offset */ 54);
		bufferWriter.writeUInt32LE(/* headerInfoSize */ 40);
		bufferWriter.writeUInt32LE(this.width);
		bufferWriter.writeUInt32LE(this.height);
		bufferWriter.writeUInt16LE(/* planes */ 1);
		bufferWriter.writeUInt16LE(/* bitPerPixel */ 32);
		bufferWriter.writeUInt32LE(/* compress */ 0);
		bufferWriter.writeUInt32LE(/* rgbSize */ this.pixels.length);
		bufferWriter.writeUInt32LE(/* hr */ 0);
		bufferWriter.writeUInt32LE(/* vr */ 0);
		bufferWriter.writeUInt32LE(/* colors */ 0);
		bufferWriter.writeUInt32LE(/* importantColors */ 0);
		Bitmap.invertY(this.pixels, this.width * 4, this.height).copy(this.bmp, bufferWriter.seek());
		return this.bmp;
	};

	/**
	 * @param {string} path
	 */
	save = (path) => {
		mkdirSync(dirname(path), { recursive: true });
		writeFileSync(path, this.encode());
	};

	destroy = () => {
		this.pixels = null;
		this.bmp = null;
	};

	/**
	 * @param {Buffer} sourceBuffer
	 * @param {number} width
	 * @param {number} height
	 * @returns
	 */
	static invertY(sourceBuffer, width, height) {
		const invertedBuffer = Buffer.from(sourceBuffer);
		for (let y = 0, yi = height - 1; y < height; y++, yi--) {
			sourceBuffer.copy(invertedBuffer, yi * width, y * width, y * width + width);
		}
		return invertedBuffer;
	};
}
