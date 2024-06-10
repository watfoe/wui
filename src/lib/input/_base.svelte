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
		colorweight,
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
	let submit_event_removed = false;

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
				validate_on_submit();
			}
		});
	});

	function try_form_submit(e: SubmitEvent) {
		_validate(input_el?.value!);
		if (error) {
			e.preventDefault();
		} else {
			// Remove the event listener after the form is submitted successfully
			(e.currentTarget as HTMLFormElement).removeEventListener('submit', try_form_submit, true);
			submit_event_removed = true;
		}
	}

	function validate_on_submit() {
		const form = input_el?.closest('form');
		// Capture phase to ensure that this event listener is the first to run
		form?.addEventListener('submit', try_form_submit, true);
	}

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
		if (submit_event_removed && rules && validateon === 'submit') {
			// Re-add the event listener if it was removed
			validate_on_submit();
			submit_event_removed = false;
		}

		let _value = e.currentTarget.value;

		if (masks) {
			_value = mask(_value, masks) || '';
			value = _value;
		}

		// Simulate bind:value when the element renders plain input field
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
		colorweight={colorweight ||
			(!error && color === 'neutral' && variant === 'outlined' ? '4' : undefined)}
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
