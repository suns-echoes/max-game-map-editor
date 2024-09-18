/**
 * @param {Uint8Array[]} tiles
 * @param {number} tilesPerSide
 * @param {number} tileSize
 * @returns {Uint8Array}
 */
function arrangeTilesInSet(tiles, tileSize, tilesPerSide) {
	const uint8 = new Uint8Array(tileSize ** 2 * tilesPerSide ** 2);

	for (let tileY = 0; tileY < tilesPerSide; tileY++) {
		for (let tileX = 0; tileX < tilesPerSide; tileX++) {
			const tileId = tileY * tilesPerSide + tileX;
			if (tileId >= tiles.length) {
				tileY = tilesPerSide;
				tileX = tilesPerSide;
				break;
			}

			for (let row = 0; row < tileSize; row++) {
				uint8.set(
					tiles[tileId].subarray(row * tileSize, row * tileSize + tileSize),
					(tileY * tileSize + row) * tileSize * tilesPerSide + tileX * tileSize,
				);
			}
		}
	}

	return uint8;
}


/**
 * Cycle palette colors in given range.
 * @param {Uint8Array} palette
 * @param {number} from (inclusive)
 * @param {number} to (inclusive)
 */
function cycleColors(palette, from, to) {
	const tempR = palette[from * 3 + 0];
	const tempG = palette[from * 3 + 1];
	const tempB = palette[from * 3 + 2];
	for (let i = from * 3; i < to * 3; i += 3) {
		palette[i + 0] = palette[i + 3 + 0];
		palette[i + 1] = palette[i + 3 + 1];
		palette[i + 2] = palette[i + 3 + 2];
	}
	palette[to * 3 + 0] = tempR;
	palette[to * 3 + 1] = tempG;
	palette[to * 3 + 2] = tempB;
}


/**
 * @param {number} from (inclusive)
 * @param {number} to (exclusive)
 * @returns {number}
 */
function random(from, to) {
	return Math.floor(Math.random() * (to - from) + from);
}
