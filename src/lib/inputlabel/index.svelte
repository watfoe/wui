<script context="module" lang="ts">
	// TODO: Fix this
	export interface InputLabelAttributes extends Omit<TextAttributes, 'variant'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import { Text, type TextAttributes } from '../text';
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

{#if children}
	<Text
		{color}
		colorweight={color === 'neutral' ? '8' : undefined}
		class="w-input__label"
		for={_for}
		pl="sm"
		size="sm"
		variant="label"
		{...rest}
	>
		{@render children()}
	</Text>
{/if}

{#if typeof description === 'string'}
	<Text color="neutral" colorweight="7" for={_for} pl="sm" size="xs" variant="label">
		{description}
	</Text>
{:else if description}
	{@render description()}
{/if}
