const vertexShaderSource = `
	precision highp float;

	attribute vec4 a_position;
	attribute vec2 a_texcoord;

	// the tile map (world map) texture coordinates according to quad size using it
	varying vec2 v_texcoord;

	void main() {
		gl_Position = a_position;
		// invert Y coordinate to match world map pattern
  		v_texcoord = a_texcoord * vec2(1, -1) + vec2(0, 1);
	}
`;

const fragmentShaderSource = `
	precision highp float;

	varying vec2 v_texcoord;

	uniform sampler2D u_tiles;
	uniform sampler2D u_palette;
	uniform sampler2D u_tileMap;
	uniform vec2 u_tileMapSize;
	uniform vec2 u_tileSetSize;

	void main() {
		// get world map (tile map) cell 2D index
		vec2 tileMapCoord = floor(v_texcoord * u_tileMapSize);
		// get cell sub-coordinates
    	vec2 cellSubCoord = fract(v_texcoord * u_tileMapSize) / u_tileSetSize;

		// get tile coordinates in tile set
		vec2 tileSetCoord = fract((tileMapCoord + vec2(0.5, 0.5)) / u_tileMapSize);
		// get tile sub-coordinates
        vec2 tileCoord = floor(texture2D(u_tileMap, tileSetCoord).xy * 256.0) / u_tileSetSize;

		// get tile pixel value to address palette
    	float paletteIndex = texture2D(u_tiles, tileCoord + cellSubCoord).a;

		// get color from palette based on map cell tile and its sub-coordinates
		vec4 color = texture2D(u_palette, vec2(paletteIndex, 0.5));

    	gl_FragColor = color;
	}
`;
