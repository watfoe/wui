<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export interface SelectAttributes
		extends Omit<LikeButtonAttributes<Omit<HTMLInputAttributes, 'size'>>, 'element'> {
		description?: Snippet | string;
		disabled?: boolean;
		error?: ValidationError | string;
		label?: Snippet | string;
		multiple?: boolean;
		name?: string;
		onvalidate?: (error?: ValidationError) => void;
		preset?: 'country' | 'month' | 'gender';
		required?: boolean;
		selected?: string;
		validateon?: 'change' | 'blur' | 'submit';
		value?: string;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Button } from '$lib/buttons';
	import { Listbox, Label } from '$lib/inputs';
	import { Icon } from '$lib/display';
	import { validate, type ValidationError } from '../_common_';
	import CountryPreset from './presets/country-preset.svelte';
	import MonthPreset from './presets/month-preset.svelte';
	import GenderPreset from './presets/gender-preset.svelte';
	import { untrack, type Snippet } from 'svelte';
	import { Popup, Surface, type LikeButtonAttributes } from '$lib/utils';

	let {
		color = 'neutral',
		colorweight,
		class: _class = '',
		children,
		description,
		disabled,
		error = $bindable(),
		gap,
		hidden,
		label,
		multiple = false,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		p,
		px,
		py,
		pt,
		pr = 2,
		pb,
		pl = 7,
		prefix,
		placeholder,
		preset,
		required,
		selected = $bindable(),
		shape,
		size,
		style,
		textcolor,
		textcolorweight,
		textsize,
		textweight,
		textbold,
		textitalic,
		textunderline,
		textvariant,
		value = $bindable(),
		validateon = 'submit',
		variant = 'outlined',
		width = '100%',
		onvalidate,
		...rest
	}: SelectAttributes = $props();

	let opened = $state(false);
	let selections = $state([] as HTMLLabelElement[]);
	let input_el: HTMLInputElement | undefined = $state();
	let listbox: HTMLFieldSetElement | undefined = $state();
	let listbox_value: string | undefined = $state();

	const id = Math.random().toString(36).substring(2, 9);

	$effect(() => {
		if (error || !error) {
			input_el?.setCustomValidity(
				error === undefined ? '' : typeof error === 'string' ? error : error?.message
			);
		}

		untrack(() => {
			if (required && validateon === 'submit') {
				// Get the form element that this input is in
				const form = input_el?.closest('form');
				form?.addEventListener(
					'submit',
					(e) => {
						e.preventDefault();
						_validate();
					},
					// Capture phase to ensure that this event listener is the first to run
					true
				);
			}
		});
	});

	function change(e: Event & { currentTarget: HTMLFieldSetElement }) {
		const label = (e.target as HTMLInputElement).parentElement as HTMLLabelElement;
		// Create a clone of the label element
		const label_clone = label.cloneNode(true) as HTMLLabelElement;
		// Remove the input child from the label element
		const children = label_clone.children;

		// The input element can be the first or second (if a prefix was added to the option)
		// child of the label element
		if (children[0] instanceof HTMLInputElement) {
			children[0].remove();
		} else {
			children[1].remove();
		}

		if (multiple) {
			selections.push(label_clone);
		} else {
			selections = [label_clone];
		}

		input_el!.value = listbox_value!;
		value = listbox_value;
		input_el!.dispatchEvent(new Event('change'));

		if (error) {
			_validate();
		}
	}

	function _validate() {
		try {
			validate(value!, {
				required: 'Please select ' + (preset ? `a ${preset}` : 'an option')
			});
			error = undefined;
		} catch (e) {
			error = e as ValidationError;
		}

		onvalidate?.(error);
	}

	function popup_closed() {
		opened = false;
		if (required && validateon === 'blur') {
			_validate();
		}
		input_el!.dispatchEvent(new Event('blur'));
	}

	function popup_opened() {
		opened = true;
	}
</script>

{#snippet _placeholder()}
	{#if placeholder}
		<span class="WuiSelect__combobox__placeholder">{placeholder}</span>
	{:else}
		<span class="WuiSelect__combobox__placeholder">
			Select {preset ? `a ${preset}` : 'an option'}
		</span>
	{/if}
{/snippet}

<Surface
	align="flex-start"
	justify="flex-start"
	class="WuiSelect {_class}"
	direction="column"
	element="fieldset"
	{gap}
	{m}
	{mx}
	{my}
	{mt}
	{mr}
	{mb}
	{ml}
	{style}
	{hidden}
	{width}
>
	{#if label}
		<Label
			color={error ? 'danger' : opened && color === 'neutral' ? 'primary' : color}
			for={id}
			{description}>{label}</Label
		>
	{/if}

	<!-- The input controls the tabindex -->
	<input type="hidden" bind:this={input_el} bind:value {...rest} />

	<Button
		anchorfor={disabled ? undefined : id}
		aria-expanded="false"
		class="WuiSelect__combobox"
		color={error ? 'danger' : color}
		justify="space-between"
		navigation="feedback"
		tabindex={-1}
		textsize={textsize || size}
		type="button"
		width="100%"
		{disabled}
		{p}
		{px}
		{py}
		{pt}
		{pr}
		{pb}
		{pl}
		{size}
		{shape}
		{textcolor}
		{textcolorweight}
		{textweight}
		{textbold}
		{textitalic}
		{textunderline}
		{textvariant}
		{variant}
	>
		{#if selections.length > 0}
			{#if multiple}
				{#each selections as selection}
					{@html selection.innerHTML}
				{/each}
			{:else}
				{@html selections[0].innerHTML}
			{/if}
		{:else}
			{@render _placeholder()}
		{/if}

		{#snippet suffix()}
			<Icon class="WuiSelect__combobox__icon" style="margin-left:auto">keyboard_arrow_down</Icon>
		{/snippet}
	</Button>
</Surface>

{#if !disabled}
	<Popup
		{id}
		{color}
		{shape}
		colorweight={!colorweight && variant === 'plain' ? '0' : colorweight}
		variant={variant === 'plain' ? 'soft' : variant}
		onopen={popup_opened}
		onclose={popup_closed}
	>
		<Listbox
			role="listbox"
			aria-label="List of {preset} options"
			class="WuiSelect__listbox"
			color="primary"
			onchange={change}
			{multiple}
			{size}
			{shape}
			bind:listbox
			bind:value={listbox_value}
		>
			{#if preset === 'country'}
				<CountryPreset {selected} />
			{:else if preset === 'month'}
				<MonthPreset {selected} />
			{:else if preset === 'gender'}
				<GenderPreset {selected} />
			{:else if children}
				{@render children()}
			{/if}
		</Listbox>
	</Popup>
{/if}
