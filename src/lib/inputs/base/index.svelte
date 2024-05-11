<script context="module" lang="ts">
	import type { BaseProps } from '../_common_';
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface BaseInputAttributes extends BaseProps<HTMLInputAttributes> {}
</script>

<script lang="ts">
	import './style.css';
	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { untrack } from 'svelte';
	import { Surface } from '$lib/utils';
	import type { WuiDimension } from '$lib';

	let {
		align = 'left',
		class: _class = '',
		color,
		disabled,
		error = $bindable(),
		height,
		masks,
		p = 2,
		px = 7,
		py,
		pt,
		pr,
		pb,
		pl,
		prefix,
		required,
		rules,
		size = 'md',
		shape = 'rounded',
		suffix,
		style = '',
		textcolor,
		textcolorweight,
		textsize,
		textweight,
		textbold,
		textitalic,
		textunderline,
		textvariant,
		validateon = 'submit',
		value = $bindable(),
		variant = 'outlined',
		onclick,
		oninput,
		onblur,
		onvalidate,
		...rest
	}: BaseInputAttributes = $props();

	let input_el: HTMLInputElement;
	height = size as WuiDimension;

	$effect(() => {
		input_el?.setCustomValidity(error === undefined ? '' : error?.message);

		untrack(() => {
			if (required && !rules?.required) {
				rules = rules || {};
				rules.required = true;
			}

			if (rules && validateon === 'submit') {
				// Get the form element that this input is in
				const form = input_el?.closest('form');
				form?.addEventListener(
					'submit',
					(e) => {
						_validate(input_el?.value!);
						if (error) {
							e.preventDefault();
							// Stop the event from propagating to other event listeners
							e.stopPropagation();
						}
					},
					// Capture phase to ensure that this event listener is the first to run
					true
				);
			}
		});
	});

	function _validate(_value: string) {
		try {
			validate(_value, rules!);
			error = undefined;
		} catch (e) {
			error = e as ValidationError;
		}

		onvalidate?.(error);
	}

	function blur(e: FocusEvent & { currentTarget: HTMLInputElement }) {
		let _value = e.currentTarget.value;

		if (rules) {
			if (
				validateon === 'blur' ||
				// input event won't trigger validation if the input is just focused and then blurred
				// without any input
				(!!_value && validateon === 'input') ||
				(rules.required && validateon === 'input' && _value === '' && !error)
			) {
				_validate(_value);
			}
		} else {
			error = undefined;
		}

		onblur?.(e);
	}

	function input(e: Event & { currentTarget: HTMLInputElement }) {
		let _value = e.currentTarget.value;

		if (masks) {
			_value = mask(_value, masks) || '';
			value = _value;
		}

		if (!required && _value === '' && error) {
			// Clear error if input is empty and not required
			error = undefined;
		} else if (rules && (validateon === 'input' || error)) {
			_validate(_value);
		}

		oninput?.(e);
	}
</script>

<Surface
	align="center"
	class="WuiInput {_class} {disabled ? 'WuiInput--disabled' : ''}"
	color={error ? 'danger' : color}
	direction="row"
	gap="xs"
	justify="space-between"
	disabled={true}
	pr={typeof suffix === 'function' ? undefined : pr || px}
	pl={typeof prefix === 'function' ? undefined : pl || px}
	style="cursor:text;{style}"
	{textcolor}
	{textcolorweight}
	{textsize}
	{textweight}
	{textbold}
	{textitalic}
	{textunderline}
	{textvariant}
	{height}
	{p}
	{py}
	{pt}
	{pb}
	{shape}
	{variant}
	width="100%"
	onclick={disabled ? undefined : () => input_el.focus()}
>
	{#if typeof prefix === 'string'}
		<Icon color="inherit" {size}>{prefix}</Icon>
	{:else if prefix}
		<div class="WuiInput__prefix" style:width="calc(var(--height-{size}) - 4px)">
			{@render prefix()}
		</div>
	{/if}

	<input
		dir="ltr"
		class="WuiInput__input"
		onblur={blur}
		oninput={input}
		onclick={(e) => {
			e.stopPropagation();
			onclick?.(e);
		}}
		style:text-align={align}
		bind:this={input_el}
		bind:value
		{disabled}
		{...rest}
	/>

	{#if typeof suffix === 'string'}
		<Icon color="inherit" {size}>{suffix}</Icon>
	{:else if suffix}
		<div class="WuiInput__suffix" style:min-width="calc(var(--height-{size}) - 6px)">
			{@render suffix()}
		</div>
	{/if}
</Surface>
