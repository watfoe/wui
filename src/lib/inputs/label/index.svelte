<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import { Text, type TextLabelAttributes } from '$lib/typography';

	interface InputLabelAttributes extends Omit<TextLabelAttributes, 'variant'> {
		description?: string;
	}

	let { description, ...rest } = $props<InputLabelAttributes>();
</script>

<Col justify="flex-start" align="flex-start" class="WuiInput__label__root">
	<Text {...rest} variant="label" size="md" class="WuiInput__label">
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
