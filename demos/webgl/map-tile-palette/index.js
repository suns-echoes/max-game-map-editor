const canvas = document.getElementById('canvas');

const wgl = new WebGL(canvas)
	.compileShaders(vertexShaderSource, fragmentShaderSource)
	.uploadPalette(palette)
	.uploadTiles(arrangeTilesInSet(tiles, tileSize, tilesPerSideInTileSet), tileSize, tileSize, tilesPerSideInTileSet, tilesPerSideInTileSet)
	.createMap(mapSize * tileSize, mapSize * tileSize, panX, panY, zoomLevel)
	.setZoomLevel(zoomLevel)
	// Make map with random tiles.
	// .uploadTileMap(new Uint8Array(
	// 	new Array(mapSize ** 2 * 4).fill(0).map(function (_, i) {
	// 		return i % 4 === 0 || i % 4 === 1
	// 			? random(0, tilesPerSideInTileSet)
	// 			: 0;
	// 	})
	// ), mapSize, mapSize)
	.uploadTileMap(worldMap, mapSize, mapSize)
	.render(function (wgl) {
		wgl.clear();

		// Emulate similar palette animation to the one implemented in M.A.X.
		cycleColors(palette, 9, 12);
		cycleColors(palette, 13, 16);
		cycleColors(palette, 17, 20);
		cycleColors(palette, 21, 24);
		cycleColors(palette, 25, 30);
		cycleColors(palette, 96, 102);
		cycleColors(palette, 103, 109);
		cycleColors(palette, 110, 116);
		cycleColors(palette, 117, 122);
		cycleColors(palette, 123, 127);

		wgl.updatePalette(palette);
	});


document.addEventListener('wheel', function (event) {
	zoomLevel += Math.sign(event.deltaY) / 20;
	if (zoomLevel < 0.05) zoomLevel = 0.05;
	else if (zoomLevel > 10) zoomLevel = 10;
	wgl.setZoomLevel(zoomLevel);
});

let dragOriginX = 0;
let dragOriginY = 0;
let isDragging = false;

document.addEventListener('mousedown', function (event) {
	event.preventDefault();
	dragOriginX = event.clientX;
	dragOriginY = event.clientY;
	isDragging = true;
});

document.addEventListener('mousemove', function (event) {
	event.preventDefault();
	if (!isDragging) return;
	panX -= (dragOriginX - event.clientX) / (canvas.offsetWidth * zoomLevel);
	panY -= (dragOriginY - event.clientY) / (canvas.offsetHeight * zoomLevel);
	dragOriginX = event.clientX;
	dragOriginY = event.clientY;
	wgl.setPanning(panX, panY);
});

document.addEventListener('mouseup', function (event) {
	event.preventDefault();
	isDragging = false;
});
