<script context="module" lang="ts">
	import { Text, type TextLabelAttributes } from '$lib/typography';

	export interface InputLabelAttributes extends Omit<TextLabelAttributes, 'variant'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import type { Snippet } from 'svelte';

	let { description, children, ...rest }: InputLabelAttributes = $props();
</script>

<Col justify="flex-start" align="flex-start" class="WuiInput__label__root">
	{#if children}
		<Text {...rest} variant="label" size="sm" class="WuiInput__label">
			{@render children()}
		</Text>
	{/if}

	{#if typeof description === 'string'}
		<Text variant="label" size="sm" color="neutral" class="WuiInput__label__desc">
			{description}
		</Text>
	{:else if description}
		{@render description()}
	{/if}
</Col>
