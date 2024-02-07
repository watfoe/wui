<script context="module" lang="ts">
	import type { BaseInputAttributes } from '../base/index.svelte';
	export type RadioGroupAttributes = Omit<BaseInputAttributes, 'id'> & {
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

	let { description, disabled, label, hidden, ...rest } = $props<RadioGroupAttributes>();
</script>

<fieldset class="WuiRadioGroup {rest.class || ''}" {hidden} {disabled}>
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
