<script context="module" lang="ts">
	export type LinkAttributes = TextAttributes & {};
</script>

<script lang="ts">
	import Text, { type TextAttributes } from '../text/index.svelte';

	let { color = 'primary', ...rest }: LinkAttributes = $props();
</script>

<Text {color} variant="a" {...rest} />
