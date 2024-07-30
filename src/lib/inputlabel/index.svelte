<script context="module" lang="ts">
	export interface InputLabelAttributes extends BaseTextAttributes<'label'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import { Col } from '$lib/col';

	import { Text, type BaseTextAttributes } from '../text';
	import type { Snippet } from 'svelte';

	let { color, description, for: _for, children }: InputLabelAttributes = $props();
</script>

{#if children}
	<Col align="flex-start" gap={2} px={3} width="100%">
		<Text
			{color}
			colorweight={color === 'neutral' ? '8' : undefined}
			class="w-input__label"
			for={_for}
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
