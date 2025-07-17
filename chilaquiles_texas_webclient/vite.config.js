import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// const fullReloadAlways = {
// 	handleHotUpdate({server}) {
// 		server.ws.send({type: 'full-reload'});
// 		return [];
// 	}
// }

export default defineConfig(async  ({ command, mode, isSsrBuild, isPreview }) => {
	const is_production = command === 'build';

	/** @type {import('vite').UserConfig} */
	let config = {
		server: {
			open: false,
			host: "0.0.0.0",
			port: 1367
		},
		resolve: {
			alias: {
				'@libs': path.resolve(__dirname, 'src/libs'),
				'@components': path.resolve(__dirname, 'src/components'),
				'@pages': path.resolve(__dirname, 'src/pages'),
				'@svg': path.resolve(__dirname, 'src/svg'),
				'@models': path.resolve(__dirname, 'src/models'),
				"@actions": path.resolve(__dirname, 'src/actions'),
				"@events": path.resolve(__dirname, 'src/events'),
				"@stores": path.resolve(__dirname, 'src/stores'),
				"@app": path.resolve(__dirname, 'src'),
			},
		},
		plugins: [
			sveltekit(),
			// fullReloadAlways
		],
		clearScreen: true
	}

	if (!is_production) {
		const ssl_key_path = process.env.SSL_KEY_PATH;
		const ssl_cert_path = process.env.SSL_CERT_PATH;

		if (ssl_cert_path != undefined && ssl_key_path != undefined)  {

			config.server = {
				...config.server,
				https: {
					key: fs.readFileSync(ssl_key_path),
					cert: fs.readFileSync(ssl_cert_path)
				}
			}

			console.log("HTTPS enabled with SSL_KEY_PATH and SSL_CERT_PATH.");
		} else {
			console.warn("SSL_KEY_PATH or SSL_CERT_PATH environment variables are not set. HTTPS will not be enabled.");
		}

	}

	return config;
});