<script context="module" lang="ts">
	import type { BaseProps } from '../_common_';
	import type { HTMLInputAttributes } from 'svelte/elements';
	export interface BaseInputAttributes extends BaseProps<HTMLInputElement, HTMLInputAttributes> {}
</script>

<script lang="ts">
	import './style.css';

	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { untrack } from 'svelte';
	import { Sheet } from '$lib/surfaces';

	let {
		_this = $bindable(),
		align = 'left',
		class: _class = '',
		color,
		error = $bindable(),
		masks,
		oninput,
		onblur,
		onvalidate,
		pad,
		padx = 'sm',
		pady,
		prefix,
		required,
		rules,
		size = 'md',
		shape,
		suffix,
		style = '',
		validateon = 'submit',
		value = $bindable(),
		variant = 'outlined',
		...rest
	}: BaseInputAttributes = $props();

	$effect(() => {
		_this?.setCustomValidity(error === undefined ? '' : error?.message);

		untrack(() => {
			if (required && !rules?.required) {
				rules = rules || {};
				rules.required = true;
			}

			if (rules && validateon === 'submit') {
				// Get the form element that this input is in
				const form = _this?.closest('form');
				form?.addEventListener(
					'submit',
					(e) => {
						_validate(_this?.value!);
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

<Sheet
	color={error ? 'danger' : color}
	{shape}
	{variant}
	{pad}
	{padx}
	{pady}
	class="WuiInput
	{prefix ? 'WuiInput--prefixed' : ''}
	{suffix ? 'WuiInput--suffixed' : ''}
	{_class}"
	style="height:var(--height-{size});{style || ''}"
>
	{#if $$slots.prefix}
		<div class="WuiInput__prefix">
			<slot name="prefix" />
		</div>
	{:else if prefix}
		<div class="WuiInput__prefix">
			<Icon>{prefix}</Icon>
		</div>
	{/if}

	<input
		dir="ltr"
		{...rest}
		class="WuiInput__input WuiText WuiText--body WuiText--{size}"
		onblur={blur}
		oninput={input}
		style="text-align:{align}"
		bind:this={_this}
		bind:value
	/>

	{#if $$slots.suffix}
		<div class="WuiInput__suffix">
			<slot name="suffix" />
		</div>
	{:else if suffix}
		<Icon class="WuiInput__suffix">{suffix}</Icon>
	{/if}
</Sheet>
