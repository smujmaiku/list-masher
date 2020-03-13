
/*!
 * List Masher <https://github.com/smujmaiku/list-masher>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

/**
 * Trim buffer end
 * @param {Buffer} buffer
 * @returns {Buffer}
 */
function bufferTrimEnd(buffer) {
	while (buffer.length > 0 && buffer.readInt8(buffer.length - 1) === 0) {
		buffer = buffer.slice(0, -1);
	}

	return buffer;
}

/**
 * Encode list
 * @param {Array(string)} list
 * @param {Object?} opts
 * @param {boolean} opts.skipSize
 * @returns {string}
 */
function encode(list, opts = {}) {
	const {
		skipSize = false,
	} = opts;

	const buffers = list.map(v => Buffer.from(v));
	const max = buffers.reduce((a, b) => Math.max(a, b.length), 0);
	let buffer = Buffer.from([]);

	for (let loc = 0; loc < max; loc++) {
		for (let index = 0; index < buffers.length; index++) {
			const data = buffers[index];
			if (loc <= data.length) {
				const byte = loc < data.length ? data[loc] : 0;
				buffer = Buffer.concat([buffer, Buffer.from([byte])]);
			}
		}
	}

	if (!skipSize) {
		const size = Buffer.from([0, 0]);
		size.writeUInt16LE(buffers.length);
		buffer = Buffer.concat([
			size,
			buffer,
		]);
	}

	return buffer.toString('base64').replace(/=+$/, '');
};

/**
 * Decode mash
 * @param {string} code
 * @param {number?} size
 * @returns {Array}
 */
function decode(code, size) {
	let buffer = Buffer.from(code, 'base64');

	if (size === undefined) {
		size = buffer.readUInt16LE(0);
		buffer = buffer.slice(2);
	}

	const buffers = [];
	while (buffers.length < size) buffers.push(Buffer.from([]));

	let index = -1;
	while (buffer.length > 0) {
		index++;
		if (index >= buffers.length) {
			if (buffers.every(buf => buf.readInt8(buf.length - 1) === 0)) break;
			index = 0;
		}

		const data = buffers[index];
		if (data.length > 0 && data.readInt8(data.length - 1) === 0) continue;

		const byte = buffer.readInt8(0);
		buffer = Buffer.from(buffer.slice(1));

		buffers[index] = Buffer.concat([
			data,
			Buffer.from([byte]),
		]);
	}

	return buffers.map(buf => bufferTrimEnd(buf).toString());
}

exports.bufferTrimEnd = bufferTrimEnd;
exports.encode = encode;
exports.decode = decode;
