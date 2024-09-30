<script lang="ts" module>
	import { type LikeButtonAttributes } from '../likebutton';

	export interface SelectAttributes
		extends Omit<LikeButtonAttributes<'div'>, 'element' | 'onchange'> {
		description?: Snippet | string;
		indicator?: Snippet | string;
		error?: ValidationError | string;
		label?: Snippet | string;
		multiple?: boolean;
		name?: HTMLSelectElement['name'];
		onchange?: HTMLInputAttributes['onchange'];
		onvalidate?: (error?: ValidationError) => void;
		preset?: 'country' | 'day' | 'month' | 'gender' | 'year';
		required?: boolean;
		selected?: string;
		showindicator?: boolean;
		validateon?: 'change' | 'blur' | 'submit';
		value?: string;
	}
</script>

<script lang="ts">
	import './style.css';
	import { LikeButton } from '../likebutton';
	import { InputLabel } from '../inputlabel';
	import { Icon } from '../icon';
	import CountryPreset from './presets/country-preset.svelte';
	import DayPreset from './presets/day-preset.svelte';
	import MonthPreset from './presets/month-preset.svelte';
	import GenderPreset from './presets/gender-preset.svelte';
	import YearPreset from './presets/year-preset.svelte';
	import { Popup } from '../popup';
	import { Surface } from '../surface';
	import { validate, type ValidationError } from '../input/_utils';
	import { setContext, untrack, type Snippet } from 'svelte';
	import { on } from 'svelte/events';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		color = 'neutral',
		colorweight,
		class: _class = '',
		children,
		description,
		disabled,
		error = $bindable(),
		gap = 3,
		hidden,
		indicator = 'keyboard_arrow_down',
		label,
		multiple = false,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		pr = 2,
		pl = 7,
		placeholder,
		preset,
		required,
		selected = $bindable(),
		showindicator = true,
		shape,
		size,
		style,
		value = $bindable(),
		validateon = 'submit',
		variant = 'outlined',
		width,
		onchange,
		onvalidate,
		...rest
	}: SelectAttributes = $props();

	let opened = $state(false);
	let selections = $state([] as HTMLLIElement[]);
	let input_el: HTMLInputElement | undefined = $state();
	let closest_form: HTMLFormElement;
	let form_submit_listener: (() => void) | undefined = undefined;
	let prev_item_cb: (() => void) | undefined = undefined;

	const id = Math.random().toString(36).substring(2, 9);

	$effect.pre(() => {
		setContext('wui-select-ctx', {
			color,
			multiple,
			size,
			shape,
			variant,
			select
		});
	});

	$effect(() => {
		if (error || !error) {
			input_el?.setCustomValidity(
				error === undefined ? '' : typeof error === 'string' ? error : error?.message
			);
		}

		closest_form = input_el?.closest('form')!;

		untrack(() => {
			if (required && validateon === 'submit') {
				validate_on_submit();
			}
		});
	});

	function select(option: HTMLLIElement, c: () => void) {
		if (prev_item_cb) {
			prev_item_cb();
		}
		prev_item_cb = c;

		if (multiple) {
			selections.push(option);
		} else {
			selections = [option];
		}

		value = option.dataset['value'] || '';
		input_el!.value = value!;
		input_el!.dispatchEvent(new Event('change'));

		if (error) {
			_validate();
		}
	}

	function validate_on_submit() {
		if (closest_form) {
			form_submit_listener = on(
				closest_form!,
				'submit',
				(e) => {
					_validate();
					if (error) {
						e.preventDefault();
					} else if (form_submit_listener) {
						form_submit_listener();
						form_submit_listener = undefined;
					}
				},
				// Capture phase to ensure that this event listener runs before form submission
				{ capture: true }
			);
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
		<span class="w-select__combobox__placeholder">{placeholder}</span>
	{:else}
		<span class="w-select__combobox__placeholder">
			Select {preset ? `a ${preset}` : 'an option'}
		</span>
	{/if}
{/snippet}

<Surface
	element="div"
	align="start"
	justify="start"
	class="w-select {_class}"
	direction="column"
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
		<InputLabel
			color={error ? 'error' : opened && color === 'neutral' ? 'primary' : color}
			for={id}
			{description}
			{size}
		>
			{label}
		</InputLabel>
	{/if}

	<input type="hidden" bind:this={input_el} bind:value tabindex="-1" {onchange} />

	<LikeButton
		element="div"
		anchorfor={disabled ? undefined : id}
		aria-labelledby={label ? id : undefined}
		class="w-select__combobox"
		color={error ? 'error' : color}
		colorweight={colorweight || variant === 'plain' ? '0' : undefined}
		justify="start"
		pr={pr || (showindicator ? undefined : pl)}
		role="combobox"
		tabindex={0}
		variant={variant === 'plain' ? 'soft' : variant}
		width="100%"
		{disabled}
		{pl}
		{size}
		{shape}
		{...rest}
	>
		{#if selections.length > 0}
			{#if multiple}
				{#each selections as selection}
					{@html selection.innerHTML}
				{/each}
			{:else}
				{@html selections[0].innerHTML}
			{/if}
		{:else if !selected}
			{@render _placeholder()}
		{/if}

		{#snippet suffix()}
			{#if showindicator && typeof indicator === 'string'}
				<Icon class="w-select__combobox__icon">{indicator}</Icon>
			{/if}
		{/snippet}
	</LikeButton>

	{#if !disabled}
		<Popup
			role="listbox"
			variant={variant === 'plain' || variant === 'none' ? 'outlined' : variant}
			shape={shape === 'circle' || shape === 'pill' ? 'rounded' : shape}
			style="max-height: calc(var(--height-md) * 13);"
			onopen={popup_opened}
			onclose={popup_closed}
			{id}
			{color}
		>
			{#if preset === 'country'}
				<CountryPreset {selected} />
			{:else if preset === 'day'}
				<DayPreset {selected} />
			{:else if preset === 'month'}
				<MonthPreset {selected} />
			{:else if preset === 'gender'}
				<GenderPreset {selected} />
			{:else if children}
				{@render children()}
			{:else if preset === 'year'}
				<YearPreset {selected} />
			{/if}
		</Popup>
	{/if}
</Surface>
