<script context="module" lang="ts">
	// TODO: Fix this
	export interface InputLabelAttributes extends Omit<TextAttributes, 'variant'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import Col from '../col';
	import Text, { type TextAttributes } from '../text';
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
			colorweight={color === 'neutral' ? '7' : undefined}
			class="w-input__label"
			for={_for}
			size="sm"
			variant="label"
			{...rest}
		>
			{@render children()}
		</Text>
	{/if}

	{#if typeof description === 'string'}
		<Text color="neutral" colorweight="6" for={_for} size="xs" variant="label">
			{description}
		</Text>
	{:else if description}
		{@render description()}
	{/if}
</Col>
