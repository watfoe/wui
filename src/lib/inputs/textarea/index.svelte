<script context="module" lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { BaseProps } from '../_common_';

	export type TextAreaAttributes = BaseProps<HTMLTextareaAttributes, HTMLTextAreaElement>;
</script>

<script lang="ts">
	import { Row } from '$lib/layout';
	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib';
	import { untrack } from 'svelte';

	let {
		_this,
		color,
		error,
		rules,
		masks,
		prefix,
		required,
		suffix,
		size,
		validateon = 'blur',
		variant,
		value,
		onblur,
		oninput,
		onvalidate,
		...rest
	}: TextAreaAttributes = $props();

	$effect(() => {
		if (error || !error) {
			_this?.setCustomValidity(error === undefined ? '' : error?.message);
		}

		untrack(() => {
			if (required && !rules?.required) {
				rules = rules || {};
				rules.required = true;
			}

			if (rules && validateon === 'submit') {
				// Get the form element that this textarea is in
				const form = _this?.closest('form');
				form?.addEventListener('submit', (e) => {
					e.preventDefault();
					_validate(_this?.value!);
				});
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

	function _onblur(e: FocusEvent & { currentTarget: HTMLTextAreaElement }) {
		let _value = e.currentTarget.value;

		if (rules && validateon === 'blur') {
			_validate(_value);
		}

		onblur?.(e);
	}

	function _oninput(e: Event & { currentTarget: HTMLTextAreaElement }) {
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

<Row class="WuiTextarea__root">
	{#if $$slots.prefix}
		<div class="WuiTextarea__prefix">
			<slot name="prefix" />
		</div>
	{:else if prefix}
		<div class="WuiTextarea__prefix">
			<Icon>{prefix}</Icon>
		</div>
	{/if}

	<textarea
		dir="ltr"
		{...rest}
		class="WuiTextarea WuiTextarea--{variant} WuiTextarea--{size} {prefix
			? 'WuiTextarea--prefixed'
			: ''} {suffix ? 'WuiTextarea--suffixed' : ''} {rest.class || ''}"
		onblur={_onblur}
		oninput={_oninput}
		bind:this={_this}
		bind:value
	/>

	{#if $$slots.suffix}
		<div class="WuiTextarea__suffix">
			<slot name="suffix" />
		</div>
	{:else if suffix}
		<Icon class="WuiTextarea__suffix">{suffix}</Icon>
	{/if}
</Row>
