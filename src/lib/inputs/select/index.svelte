<script context="module" lang="ts">
	import type { HTMLFieldsetAttributes } from 'svelte/elements';

	export interface SelectAttributes extends Omit<HTMLFieldsetAttributes, 'size'> {
		_this?: HTMLFieldSetElement;
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
		description?: string;
		error?: ValidationError;
		label?: string;
		multiple?: boolean;
		name?: string;
		onvalidate?: (error?: ValidationError) => void;
		preset?: 'country' | 'month' | 'gender';
		required?: boolean;
		selected?: string;
		size?: 'sm' | 'md' | 'lg';
		validateon?: 'change' | 'blur' | 'submit';
		value?: string;
		variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
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
		color = 'neutral',
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
		size = 'md',
		style,
		value = $bindable(),
		validateon = 'submit',
		variant = 'outline',
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
		const label = (e.target as HTMLInputElement).nextElementSibling as HTMLLabelElement;
		if (multiple) {
			selections.push(label);
		} else {
			selections = [label];
		}

		onchange?.(e);
	}

	// Keyboard accessibility
	function _onkeydown(e: KeyboardEvent) {
		const { key } = e;
		const { length } = selections;

		if (key === 'ArrowDown' || key === 'ArrowUp') {
			e.preventDefault();
			combobox?.click();
		} else if (key === 'Backspace' && length > 0) {
			e.preventDefault();
			selections[length - 1].click();
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

	function close() {
		if (required && validateon === 'blur') {
			_validate();
		}
		combobox.blur();
		_this?.dispatchEvent(new Event('blur'));
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
		role="combobox"
		type="button"
		aria-expanded="false"
		anchorfor={id}
		color={error ? 'danger' : opened ? 'primary' : color}
		{variant}
		{size}
		bold={false}
		justify="space-between"
		width="full"
		class="WuiSelect__combobox {opened ? 'WuiSelect__combobox--opened' : ''}"
		onkeydown={_onkeydown}
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

<Popup {id} onclose={close}>
	<Listbox
		role="listbox"
		aria-label="List of options"
		class="WuiSelect__listbox"
		{multiple}
		{name}
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
