<script context="module" lang="ts">
	export type LinkAttributes = TextAttributes & {};
</script>

<script lang="ts">
	import { Text, type TextAttributes } from '../text';

	let { color = 'primary', underline = false, ...rest }: LinkAttributes = $props();
</script>

<Text {color} {underline} variant="a" {...rest} />
