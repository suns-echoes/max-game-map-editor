import { CliLog } from './cli-log.js';


export class BufferWriter {
	/** @type {Buffer} */
	buffer = null;

	/**
	 * @param {Buffer} buffer
	 * @param {boolean} [showDebugInfo]
	 */
	constructor (buffer, showDebugInfo = false) {
		this.buffer = buffer;
		this.#showDebugInfo = showDebugInfo;
		this.#addrPad = Math.ceil(this.buffer.byteLength.toString(16).length / 8) * 8;

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
	 * @param {string} data
	 * @param {string} [label]
	 * @returns {void}
	 */
	writeString(data, label) {
		if (this.#showDebugInfo)
			this.#logger
				.msg(`> writing${label ? ` <${label}>` : ''}: `)
				.cyan(data.length).reset()
				.msg(' CHAR to ')
				.lightGreen(this.#getCurrentAddress())
				.log();

		this.buffer.write(data, this.#offset, 'utf8');
		this.#offset += data.length;
	}

	/**
	 * @param {number} data
	 * @param {string} [label]
	 * @returns {void}
	 */
	writeUInt16LE(data, label) {
		if (this.#showDebugInfo)
			this.#logger
				.msg(`> writing${label ? ` <${label}>` : ''}: `)
				.cyan(1).reset()
				.msg(' UInt32LE to ')
				.lightGreen(this.#getCurrentAddress())
				.log();

		this.buffer.writeUInt16LE(data, this.#offset);
		this.#offset += 2;
	}

	/**
	 * @param {number} data
	 * @param {string} [label]
	 * @returns {void}
	 */
	writeUInt32LE(data, label) {
		if (this.#showDebugInfo)
			this.#logger
				.msg(`> writing${label ? ` <${label}>` : ''}: `)
				.cyan(1).reset()
				.msg(' UInt32LE to ')
				.lightGreen(this.#getCurrentAddress())
				.log();

		this.buffer.writeUint32LE(data, this.#offset);
		this.#offset += 4;
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
