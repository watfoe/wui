<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type {
		WuiColor,
		WuiFlexDirection,
		WuiFlexGap,
		WuiShape,
		WuiSize,
		WuiVariant
	} from '$lib/types';
	export type CheckboxGroupAttributes = Omit<HTMLInputAttributes, 'id'> & {
		color?: WuiColor;
		direction?: WuiFlexDirection;
		multiple?: boolean;
		size?: WuiSize;
		shape?: WuiShape;
		value?: string;
		variant?: WuiVariant;
		description?: string;
		label?: string;
		gap?: WuiFlexGap;
	};
</script>

<script lang="ts">
	import { Flex } from '../flex';
	import { InputLabel } from '../inputlabel';
	import { setContext } from 'svelte';

	let {
		color,
		children,
		class: _class = '',
		description,
		disabled,
		direction = 'column',
		gap = 'sm',
		label,
		hidden,
		name,
		size,
		shape,
		variant
	}: CheckboxGroupAttributes = $props();

	setContext('wui-checkbox-group-ctx', {
		color,
		name,
		size,
		shape,
		variant
	});
</script>

<fieldset class="w-checkboxgroup {_class}" {hidden} {disabled}>
	{#if label}
		<InputLabel {description}>{label}</InputLabel>
	{/if}

	<Flex items="start" justify="start" {direction} {gap}>
		{#if children}
			{@render children()}
		{/if}
	</Flex>
</fieldset>

<style>
	.w-checkboxgroup {
		border: 0;
		outline: 0;
		appearance: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		width: auto;
	}

	.w-checkboxgroup :global(.w-input__label__root) {
		max-width: unset !important;
	}
</style>
