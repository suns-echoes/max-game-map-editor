export const exposedENV: Record<string, any> = {

	// Update:
	// ./src-tauri/tauri.conf.json:package.version
	// ./src-tauri/Cargo.toml:version
	build_version: process.env.npm_package_version,

};
