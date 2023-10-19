import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { cssModules, linearPreprocess } from 'svelte-preprocess-cssmodules';
import delegateEvents from 'svelte-preprocess-delegate-events/preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: linearPreprocess([
		vitePreprocess(),
		delegateEvents(),
		cssModules({
			mode: 'native',
		}),
	]),

	kit: {
		adapter: adapter(),
	}
};

export default config;
