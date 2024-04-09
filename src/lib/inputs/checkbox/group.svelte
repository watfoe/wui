<script context="module" lang="ts">
	import type { BaseInputAttributes } from '../base/index.svelte';
	export type RadioGroupAttributes = Omit<BaseInputAttributes, 'id'> & {
		class?: string;
		children: Snippet;
		description?: string;
		disabled?: boolean;
		hidden?: boolean;
		label?: string;
	};
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '$lib/layout';
	import Label from '../label/index.svelte';
	import type { Snippet } from 'svelte';

	let { children, description, disabled, label, hidden, ...rest }: RadioGroupAttributes = $props();
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
		{@render children()}
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
