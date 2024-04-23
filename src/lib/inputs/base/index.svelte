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

	let {
		align = 'left',
		class: _class = '',
		color,
		error = $bindable(),
		masks,
		oninput,
		onblur,
		onvalidate,
		p,
		px = 'sm',
		py,
		prefix,
		required,
		rules,
		size = 'md',
		shape = 'rounded',
		suffix,
		style = '',
		validateon = 'submit',
		value = $bindable(),
		variant = 'outlined',
		...rest
	}: BaseInputAttributes = $props();

	let input_el: HTMLInputElement;

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
	color={error ? 'danger' : color}
	{shape}
	{variant}
	{p}
	{px}
	{py}
	class="WuiInput WuiInput--{size}
	{prefix ? 'WuiInput--prefixed' : ''}
	{suffix ? 'WuiInput--suffixed' : ''}
	{_class}"
	{style}
>
	{#if prefix}
		<div class="WuiInput__prefix">
			{#if typeof prefix === 'string'}
				<Icon>{prefix}</Icon>
			{:else}
				{@render prefix()}
			{/if}
		</div>
	{/if}

	<input
		dir="ltr"
		{...rest}
		class="WuiInput__input WuiText WuiText--body WuiText--{size}"
		onblur={blur}
		oninput={input}
		style="text-align:{align}"
		bind:this={input_el}
		bind:value
	/>

	{#if suffix}
		<div class="WuiInput__suffix">
			{#if typeof suffix === 'string'}
				<Icon>{suffix}</Icon>
			{:else}
				{@render suffix()}
			{/if}
		</div>
	{/if}
</Surface>
