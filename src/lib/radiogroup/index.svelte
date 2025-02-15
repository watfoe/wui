<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type {
		WuiColor,
		WuiFlexDirection,
		WuiFlexGap,
		WuiShape,
		WuiSize,
		WuiVariant
	} from '$lib/types';

	export type RadioGroupAttributes = Omit<HTMLInputAttributes, 'id'> & {
		color?: WuiColor;
		direction?: WuiFlexDirection;
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
		gap = 'sm',
		label,
		hidden,
		name,
		size,
		shape,
		direction = 'column',
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

<fieldset role="radiogroup" class="w-radiogroup {_class}" {hidden} {disabled}>
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
	.w-radiogroup {
		border: 0;
		outline: 0;
		appearance: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		width: auto;
	}

	.w-radiogroup :global(.w-input__label__root) {
		max-width: unset !important;
	}
</style>
