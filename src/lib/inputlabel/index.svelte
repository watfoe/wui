<script context="module" lang="ts">
	// TODO: Fix me
	export interface InputLabelAttributes extends Omit<TextAttributes, 'variant'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import { Col } from '$lib/col';

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
	<Col align="flex-start" gap={2} px="sm" width="100%">
		<Text
			{color}
			colorweight={color === 'neutral' ? '8' : undefined}
			class="w-input__label"
			for={_for}
			size="sm"
			variant="label"
			style="line-height:1"
		>
			{@render children()}
		</Text>

		{#if typeof description === 'string'}
			<Text
				color="neutral"
				colorweight={color === 'neutral' ? '7' : undefined}
				class="w-input__description"
				for={_for}
				size="xs"
				variant="label"
			>
				{description}
			</Text>
		{:else if description}
			{@render description()}
		{/if}
	</Col>
{/if}
