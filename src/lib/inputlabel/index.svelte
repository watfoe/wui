<script lang="ts" module>
	export interface InputLabelAttributes extends BaseTextAttributes<'label'> {
		description?: Snippet | string;
	}
</script>

<script lang="ts">
	import { Col } from '$lib/col';

	import { Text, type BaseTextAttributes } from '../text';
	import type { Snippet } from 'svelte';

	let { color, description, for: _for, ...rest }: InputLabelAttributes = $props();
</script>

{#snippet label(px?: number)}
	<Text
		{color}
		colorweight={color === 'neutral' ? '8' : undefined}
		class="w-input__label"
		for={_for}
		variant="label"
		style="line-height:1"
		{px}
		{...rest}
	/>
{/snippet}

{#if description}
	<Col align="flex-start" gap={2} px={3} width="100%">
		{@render label()}
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
		{:else}
			{@render description()}
		{/if}
	</Col>
{:else}
	{@render label(3)}
{/if}
