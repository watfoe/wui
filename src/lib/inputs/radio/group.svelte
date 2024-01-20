<script context="module" lang="ts">
	import type { BaseInputProps } from '../base/index.svelte';
	export type RadioGroupProps = Omit<BaseInputProps, 'id'> & {
		class?: string;
		description?: string;
		disabled?: boolean;
		label?: string;
		hidden?: boolean;
	};
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import Label from '../label/index.svelte';

	type $$Props = RadioGroupProps;

	export let description: $$Props['description'] = undefined;
	export let disabled: $$Props['disabled'] = undefined;
	export let label: $$Props['label'] = undefined;
	export let hidden: $$Props['hidden'] = undefined;
</script>

<fieldset class="WuiRadioGroup {$$restProps.class || ''}" {hidden} {disabled}>
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

	<Col align="flex-start" justify="flex-start" width="full" gap="nm">
		<slot />
	</Col>
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
