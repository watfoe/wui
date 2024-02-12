<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseProps } from '../_common_';

	export type BaseInputAttributes = BaseProps<
		Omit<HTMLInputAttributes, 'prefix' | 'size'>,
		HTMLInputElement
	>;
</script>

<script lang="ts">
	import './style.css';
	import { Row } from '$lib/layout';

	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { onMount } from 'svelte';

	let {
		_this,
		error,
		masks,
		oninput,
		onblur,
		onvalidate,
		prefix,
		required,
		rules,
		size = 'md',
		suffix,
		validateon = 'submit',
		value,
		variant = 'outline',
		...rest
	} = $props<BaseInputAttributes>();

	$effect(() => {
		if (error || !error) {
			_this?.setCustomValidity(error === undefined ? '' : error?.message);
		}
	});

	onMount(() => {
		if (required && !rules?.required) {
			rules = rules || {};
			rules.required = true;
		}

		if (rules && validateon === 'submit') {
			// Get the form element that this input is in
			const form = _this?.closest('form');
			form?.addEventListener('submit', (e) => {
				e.preventDefault();
				_validate(_this?.value!);
			});
		}
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

	function _onblur(e: FocusEvent & { currentTarget: HTMLInputElement }) {
		let _value = e.currentTarget.value;

		if (rules && validateon === 'blur') {
			_validate(_value);
		}

		onblur?.(e);
	}

	function _oninput(e: Event & { currentTarget: HTMLInputElement }) {
		let _value = e.currentTarget.value;

		if (masks) {
			_value = mask(_value, masks) || '';
			value = _value;
		}

		if (rules && (validateon === 'input' || error)) {
			_validate(_value);
		}

		oninput?.(e);
	}
</script>

<Row class="WuiInput__field__root">
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
		class="WuiInput WuiInput--{variant} WuiInput--{size} {prefix
			? 'WuiInput--prefixed'
			: ''} {suffix ? 'WuiInput--suffixed' : ''} {rest.class || ''}"
		onblur={_onblur}
		oninput={_oninput}
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
</Row>
