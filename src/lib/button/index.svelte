<script context="module" lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	export interface ButtonProps extends HTMLButtonAttributes {
		anchorfor?: string;
		bold?: boolean;
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		size?: 'sm' | 'md' | 'lg';
		gap?: 'sm' | 'nm' | 'md' | 'lg';
		justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		loading?: boolean;
		prefix?: string;
		rounded?: boolean;
		suffix?: string;
		width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		element?: HTMLButtonElement;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Icon } from '$lib/display';
	import { Text } from '$lib/typography';
	import { onMount } from 'svelte';

	interface $$Props extends ButtonProps {}

	export let bold: $$Props['bold'] = false;
	export let gap: $$Props['gap'] = 'nm';
	export let size: $$Props['size'] = 'md';
	export let variant: $$Props['variant'] = 'solid';
	export let color: $$Props['color'] = 'primary';
	export let loading: $$Props['loading'] = false;
	export let justify: $$Props['justify'] = 'center';
	export let disabled: $$Props['disabled'] = false;
	export let anchorfor: $$Props['anchorfor'] = undefined;
	export let prefix: $$Props['prefix'] = undefined;
	export let rounded: $$Props['rounded'] = false;
	export let suffix: $$Props['suffix'] = undefined;
	export let width: $$Props['width'] = undefined;
	export let height: $$Props['height'] = undefined;
	export let element: $$Props['element'] = undefined;

	let feedback: HTMLDialogElement;

	onMount(() => {
		if (anchorfor) {
			const _feedback = document.getElementById(anchorfor);

			if (_feedback instanceof HTMLDialogElement) {
				feedback = _feedback;
			} else {
				throw new Error(`button "anchorfor" attribute must be a valid dialog id`);
			}
		}
	});

	function click(e: CustomEvent<HTMLButtonElement>) {
		feedback?.dispatchEvent(
			new CustomEvent('open', {
				detail: {
					anchor: e.currentTarget
				}
			})
		);
	}
</script>

<button
	{...$$restProps}
	bind:this={element}
	class="WuiButton WuiButton--{variant} WuiButton--{size} WuiButton--{color} WuiButton--gap-{gap} {width
		? 'WuiButton--width-' + width
		: ''} {height ? 'WuiButton--height-' + height : ''} {!$$slots.default
		? 'WuiButton--only-icon'
		: ''} {$$restProps.class || ''}"
	disabled={loading || disabled}
	style="{$$restProps.style || ''};--WuiButtonFlex-justify:{justify};{rounded
		? '--WuiButton-radius:calc(var(--WuiButton-height) / 2);'
		: ''}"
	on:click={click}
	on:*
>
	{#if loading}
		<span class="WuiButton__loader" />
	{:else}
		{#if $$slots.prefix}
			<slot name="prefix" />
		{:else if prefix}
			<Icon {size}>{prefix}</Icon>
		{/if}

		{#if $$slots.default}
			<Text {bold} size="md" class="WuiButton__text">
				<slot />
			</Text>
		{/if}

		{#if $$slots.suffix}
			<slot name="suffix" />
		{:else if suffix}
			<Icon {size}>{suffix}</Icon>
		{/if}
	{/if}
</button>
