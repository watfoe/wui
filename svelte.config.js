import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import delegateEvents from 'svelte-preprocess-delegate-events/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		delegateEvents()
	],

	kit: {
		adapter: adapter(),
	}
};

export default config;
