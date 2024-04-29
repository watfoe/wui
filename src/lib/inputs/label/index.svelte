<script context="module" lang="ts">
	import { Text, type TextAttributes } from '$lib/typography';

	export interface InputLabelAttributes extends Omit<TextAttributes, 'variant'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import { Col } from '$lib/layout';
	import type { Snippet } from 'svelte';

	let {
		color,
		description,
		for: _for,
		children,
		style = '',
		...rest
	}: InputLabelAttributes = $props();
</script>

<Col align="flex-start" justify="flex-start" pl="sm" width="100%">
	{#if children}
		<Text
			{color}
			for={_for}
			size="sm"
			variant="label"
			style={color ? style : `color:var(--WuiLabel-color);${style}`}
			{...rest}
		>
			{@render children()}
		</Text>
	{/if}

	{#if typeof description === 'string'}
		<Text color="neutral" for={_for} size="xs" variant="label">
			{description}
		</Text>
	{:else if description}
		{@render description()}
	{/if}
</Col>
