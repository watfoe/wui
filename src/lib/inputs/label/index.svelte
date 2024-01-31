<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import { Text } from '$lib/typography';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface $$Props extends HTMLLabelAttributes {
		description?: string;
	}

	export let description: $$Props['description'] = undefined;
</script>

<Col justify="flex-start" align="flex-start" class="WuiInput__label__root">
	<Text variant="label" size="md" class="WuiInput__label" {...$$restProps}>
		{#if $$slots.default}
			<slot />
		{/if}
	</Text>

	{#if $$slots.description}
		<Text variant="label" size="sm" color="neutral" class="WuiInput__label__desc">
			<slot name="description" />
		</Text>
	{:else if description}
		<Text variant="label" size="sm" color="neutral" class="WuiInput__label__desc"
			>{description}</Text
		>
	{/if}
</Col>
