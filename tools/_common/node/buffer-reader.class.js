import { CliLog } from './cli-log.js';


export class BufferReader {
	/** @type {Buffer} */
	buffer = null;

	/**
	 * @param {Buffer} buffer
	 * @param {boolean} [showDebugInfo]
	 */
	constructor (buffer, showDebugInfo = false) {
		this.#showDebugInfo = showDebugInfo;
		this.#addrPad = Math.ceil(buffer.byteLength.toString(16).length / 8) * 8;
		this.buffer = buffer;

		if (this.#showDebugInfo)
			this.#logger = new CliLog();
	}

	/**
	 * @param {number} [offset]
	 * @returns {number}
	 */
	seek(offset) {
		if (offset !== void 0)
			return this.#offset = offset;
		else
			return this.#offset;
	}

	/**
	 * @param {number} [length]
	 * @param {string} [label = ''] Used for displaying current address in debug mode
	 * @returns {Buffer}
	 */
	readBytes(length = this.buffer.byteLength - this.#offset, label) {
		if (this.#showDebugInfo && label)
			this.#logger
				.msg(`> reading${label ? ` <${label}>` : ''}: `)
				.cyan(length).reset()
				.msg(' UInt8 from ')
				.lightGreen(this.#getCurrentAddress())
				.log();

		const bytes = this.buffer.slice(this.#offset, this.#offset + length);
		this.#offset += length;
		return bytes;
	}

	/**
	 * @param {string} [label] Used for displaying current address in debug mode
	 * @returns {number}
	 */
	readUInt16LE(label) {
		if (this.#showDebugInfo && label)
			this.#logger
				.msg(`> reading${label ? ` <${label}>` : ''}: `)
				.cyan(length).reset()
				.msg(' UInt16LE from ')
				.lightGreen(this.#getCurrentAddress())
				.log();

		const uint16 = this.buffer.readUInt16LE(this.#offset);
		this.#offset += 2;
		return uint16;
	}

	/** @type {number} */
	#offset = 0;
	/** @type {boolean} */
	#showDebugInfo = false;
	/** @type {number} */
	#addrPad = 8; // Used for displaying current address in debug mode
	/** @type {CliLog} */
	#logger = null;

	/**
	 * @returns {number}
	 */
	#getCurrentAddress() {
		return this.#offset.toString(16).toUpperCase().padStart(this.#addrPad, '0');
	}
}
