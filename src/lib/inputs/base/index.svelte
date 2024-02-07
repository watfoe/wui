<script context="module" lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { BaseProps } from '../_common_';

	export type BaseInputAttributes = BaseProps<Omit<HTMLInputAttributes, 'prefix' | 'size'>>;
</script>

<script lang="ts">
	import './style.css';
	import { Row } from '$lib/layout';

	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { onMount } from 'svelte';

	let {
		element,
		error,
		masks,
		prefix,
		required,
		rules,
		size = 'md',
		suffix,
		validateon = 'submit',
		value = '',
		variant = 'outline',
		...rest
	} = $props<BaseInputAttributes>();
	let input: HTMLInputElement;

	$effect(() => {
		if (error || !error) {
			input?.setCustomValidity(error === undefined ? '' : error?.message);
		}
	});

	onMount(() => {
		if (required && !rules?.required) {
			rules = rules || {};
			rules.required = true;
		}

		if (rules && validateon === 'submit') {
			// Get the form element that this input is in
			const form = input?.closest('form');
			form?.addEventListener('submit', (e) => {
				e.preventDefault();
				_validate(input?.value!);
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
	}

	function change(e: Event) {
		let _value = (e.target as HTMLInputElement)?.value;

		if (masks) {
			_value = mask(_value, masks) || '';
			value = _value;
		}

		if (rules && (validateon === 'change' || error)) {
			_validate(_value);
		}
	}

	function blur(e: Event) {
		if (rules && validateon === 'blur') {
			_validate((e.target as HTMLInputElement)?.value);
		}
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
		bind:this={input}
		{...rest}
		class="WuiInput WuiInput--{variant} WuiInput--{size} {prefix
			? 'WuiInput--prefixed'
			: ''} {suffix ? 'WuiInput--suffixed' : ''} {rest.class || ''}"
		oninput={change}
		onblur={blur}
		on:validate
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
