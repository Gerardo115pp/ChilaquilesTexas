import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			"@errors/*": "./src/errors/*",
			"@libs/*": "./src/libs/*",
			"@components/*": "./src/components/*",
			"@models/*": "./src/models/*",
			"@pages/*": "./src/pages/*",
			"@svg/*": "./src/svg/*",
			"@actions/*": "./src/actions/*",
			"@events/*": "./src/events/*",
			"@stores/*": "./src/stores/*",
			"@databases/*": "./src/databases/*",
			"@themes/*": "./src/themes/*",
			"@app/*": "./src/*",
			"@config/*": "./src/config/*",
			"@common/*": "./src/common/*",
		}
	}
};

export default config;
