<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';

	export type RadioGroupAttributes = Omit<HTMLInputAttributes, 'id'> & {
		color?: WuiColor;
		size?: WuiSize;
		shape?: WuiShape;
		value?: string;
		variant?: WuiVariant;
		description?: string;
		label?: string;
		orientation?: 'horizontal' | 'vertical';
		gap?: WuiSpacing;
	};
</script>

<script lang="ts">
	import './style.css';
	import { Col, Row } from '$lib/layout';
	import Label from '../label/index.svelte';
	import { setContext } from 'svelte';

	let {
		color,
		description,
		disabled,
		gap = 'sm',
		label,
		hidden,
		name,
		size,
		shape,
		orientation = 'vertical',
		variant,
		...rest
	}: RadioGroupAttributes = $props();

	setContext('wui-radio-group-ctx', {
		color,
		name,
		size,
		shape,
		variant
	});
</script>

<fieldset role="radiogroup" class="WuiRadioGroup {rest.class || ''}" {hidden} {disabled}>
	{#if label && $$slots.description && !hidden}
		<Label {description}>
			{label}
			<slot name="description" slot="description" />
		</Label>
	{:else if label && !hidden}
		<Label {description}>
			{label}
		</Label>
	{/if}

	{#if orientation === 'horizontal'}
		<Row align="flex-start" justify="flex-start" {gap}>
			<slot />
		</Row>
	{:else}
		<Col align="flex-start" justify="flex-start" {gap}>
			<slot />
		</Col>
	{/if}
</fieldset>

<style>
	.WuiRadioGroup {
		border: 0;
		outline: 0;
		appearance: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		width: auto;
	}

	.WuiRadioGroup :global(.WuiInput__label__root) {
		max-width: unset !important;
	}
</style>
