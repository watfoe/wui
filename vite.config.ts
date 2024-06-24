import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import browserslist from 'browserslist';
import {browserslistToTargets} from 'lightningcss';

export default defineConfig({
	plugins: [
		sveltekit(),
	],
	css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: browserslistToTargets(browserslist('>= 0.25%'))
    }
  },
  build: {
		minify: true,
    cssMinify: 'lightningcss'
  }
});
