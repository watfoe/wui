<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface BaseInputAttributes extends BaseProps<HTMLInputAttributes> {}
</script>

<script lang="ts">
	import './style.css';
	import type { WuiDimension } from '$lib/types';
	import { validate, mask, ValidationError, type BaseProps } from './_utils';
	import { Icon } from '../icon';
	import { Surface } from '../surface';
	import { untrack } from 'svelte';

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
		input_el?.setCustomValidity(
			error === undefined ? '' : typeof error === 'string' ? error : error?.message
		);

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

		// Similate bind:value when the element renders plain input field
		// We can't bind:value to Surface component because it's not an input element
		if (!prefix && !suffix) {
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

{#snippet internal()}
	{#if typeof prefix === 'string'}
		<Icon color="inherit" {size}>{prefix}</Icon>
	{:else if prefix}
		<div class="w-input__prefix" style:width="calc(var(--height-{size}) - 4px)">
			{@render prefix()}
		</div>
	{/if}

	<input
		class="w-input__input"
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
		<div class="w-input__suffix" style:min-width="calc(var(--height-{size}) - 6px)">
			{@render suffix()}
		</div>
	{/if}
{/snippet}

{#if prefix || suffix}
	<Surface
		element="div"
		align="center"
		class="w-input {_class} {disabled ? 'w-input--disabled' : ''}"
		color={error ? 'danger' : color}
		direction="row"
		gap="xs"
		justify="space-between"
		pr={typeof suffix === 'function' ? undefined : pr || px}
		pl={typeof prefix === 'function' ? undefined : pl || px}
		style="cursor:text;{style}"
		width="100%"
		{disabled}
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
		onclick={disabled ? undefined : () => input_el.focus()}
	>
		{#if prefix || suffix}
			{@render internal()}
		{/if}
	</Surface>
{:else}
	<Surface
		element="input"
		class="w-input {_class} {disabled ? 'w-input--disabled' : ''}"
		color={error ? 'danger' : color}
		pr={pr || px}
		pl={pl || px}
		onblur={blur}
		oninput={input}
		style="text-align:{align};{style}"
		width="100%"
		bind:_this={input_el}
		{value}
		{disabled}
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
		{...rest}
	/>
{/if}
