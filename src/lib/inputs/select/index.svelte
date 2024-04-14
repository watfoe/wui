<script context="module" lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface SelectAttributes extends Omit<HTMLFieldsetAttributes, 'size'> {
		_this?: HTMLFieldSetElement;
		color?: WuiColor;
		description?: string;
		error?: ValidationError;
		label?: string;
		multiple?: boolean;
		name?: string;
		onvalidate?: (error?: ValidationError) => void;
		preset?: 'country' | 'month' | 'gender';
		required?: boolean;
		selected?: string;
		shape?: WuiShape;
		size?: WuiSize;
		validateon?: 'change' | 'blur' | 'submit';
		value?: string;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	import './style.css';
	import { Button } from '$lib/buttons';
	import { Listbox, Label } from '$lib/inputs';
	import { Col } from '$lib/layout';
	import { Icon } from '$lib/display';
	import { validate, type ValidationError } from '../_common_';
	import CountryPreset from './presets/country-preset.svelte';
	import MonthPreset from './presets/month-preset.svelte';
	import GenderPreset from './presets/gender-preset.svelte';
	import { untrack } from 'svelte';
	import { Popup } from '$lib/utils';

	let {
		_this = $bindable(),
		color,
		class: _class,
		description,
		error = $bindable(),
		label,
		multiple = false,
		name,
		onchange,
		onvalidate,
		placeholder,
		preset,
		required,
		selected = $bindable(),
		shape,
		size,
		style,
		value = $bindable(),
		validateon = 'submit',
		variant = 'outlined',
		...rest
	}: SelectAttributes = $props();

	let opened = $state(false);
	let selections = $state([] as HTMLLabelElement[]);
	let combobox: HTMLButtonElement;

	const id = Math.random().toString(36).substring(2, 9);

	$effect(() => {
		if (error || !error) {
			_this?.setCustomValidity(error === undefined ? '' : error?.message);
		}

		untrack(() => {
			if (required && validateon === 'submit') {
				// Get the form element that this input is in
				const form = _this?.closest('form');
				form?.addEventListener('submit', (e) => {
					e.preventDefault();
					_validate();
				});
			}
		});
	});

	function change(e: Event & { currentTarget: HTMLFieldSetElement }) {
		const label = (e.target as HTMLInputElement).parentElement as HTMLLabelElement;
		if (multiple) {
			selections.push(label);
		} else {
			selections = [label];
		}

		onchange?.(e);
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
		combobox.blur();
	}

	function popup_opened() {
		opened = true;
	}
</script>

<Col
	align="flex-start"
	justify="flex-start"
	class="WuiSelect__root WuiSelect--{color} WuiSelect--{variant} {_class || ''}"
	{style}
>
	{#if label && $$slots.description}
		<Label for={id} {description}>
			{label}
			<slot name="description" slot="description" />
		</Label>
	{:else if label}
		<Label for={id} {description}>
			{label}
		</Label>
	{/if}

	<Button
		type="button"
		aria-expanded="false"
		anchorfor={id}
		navigation="feedback"
		color={error ? 'danger' : opened ? color || 'primary' : color}
		{variant}
		{size}
		{shape}
		bold={false}
		justify="space-between"
		width="full"
		class="WuiSelect__combobox"
		bind:_this={combobox}
	>
		{#if selections.length > 0}
			{#if multiple}
				{#each selections as selection}
					{@html selection.innerHTML}
				{/each}
			{:else}
				{@html selections[0].innerHTML}
			{/if}
		{:else if placeholder}
			<span class="WuiSelect__combobox__placeholder">{placeholder}</span>
		{:else}
			<span class="WuiSelect__combobox__placeholder">
				Select {preset ? `a ${preset}` : 'an option'}
			</span>
		{/if}

		<Icon slot="suffix" class="WuiSelect__combobox__icon">keyboard_arrow_down</Icon>
	</Button>
</Col>

<Popup {id} {color} {shape} {variant} onopen={popup_opened} onclose={popup_closed}>
	<Listbox
		role="listbox"
		aria-label="List of {preset} options"
		class="WuiSelect__listbox"
		{multiple}
		{name}
		color="primary"
		{size}
		onchange={change}
		bind:_this
		bind:value
	>
		{#if preset === 'country'}
			<CountryPreset {selected} />
		{:else if preset === 'month'}
			<MonthPreset {selected} />
		{:else if preset === 'gender'}
			<GenderPreset {selected} />
		{:else}
			<slot />
		{/if}
	</Listbox>
</Popup>
