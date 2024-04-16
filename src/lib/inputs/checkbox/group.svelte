<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiSpacing, WuiVariant } from '$lib/types';
	export type CheckboxGroupAttributes = Omit<HTMLInputAttributes, 'id'> & {
		color?: WuiColor;
		multiple?: boolean;
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
	}: CheckboxGroupAttributes = $props();

	setContext('wui-checkbox-group-ctx', {
		color,
		name,
		size,
		shape,
		variant
	});
</script>

<fieldset class="WuiCheckboxGroup {rest.class || ''}" {hidden} {disabled}>
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
	.WuiCheckboxGroup {
		border: 0;
		outline: 0;
		appearance: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		width: auto;
	}

	.WuiCheckboxGroup :global(.WuiInput__label__root) {
		max-width: unset !important;
	}
</style>
