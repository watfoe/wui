<script context="module" lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { BaseProps } from '../_common_';

	export type TextAreaAttributes = BaseProps<HTMLTextareaAttributes>;
</script>

<script lang="ts">
	import { Button } from '$lib/button';
	import { Row } from '$lib/layout';
	import { validate, mask, ValidationError } from '../_common_';

	let {
		value = '',
		error = null,
		rules,
		masks,
		prefix,
		suffix,
		validateon = 'blur',
		...rest
	} = $props<TextAreaAttributes>();

	let textarea: HTMLTextAreaElement;

	export const clearError = () => {
		error = null;
	};

	export const _validateField = (_value: string) => {
		try {
			validate(_value, rules!);
			clearError();
			textarea.dispatchEvent(
				new CustomEvent('validate', {
					detail: { value }
				})
			);
		} catch (e) {
			error = e as ValidationError;
			textarea.dispatchEvent(
				new CustomEvent('validate', {
					detail: { error }
				})
			);
		}
	};

	function handleChange(e: CustomEvent<HTMLTextAreaElement>) {
		let _value = e.target?.value;
		if (masks) {
			_value = mask(_value, masks) || '';
		}

		value = _value;

		if (rules && validateon === 'change') {
			_validateField(_value);
		}
	}

	function handleBlur(e) {
		let _value = e.target?.value;
		if (rules && validateon === 'blur') {
			_validateField(_value);
		}
	}

	const handleAnchorClick = () => {
		// Prevent the input from losing focus or focus it
		textarea.focus();
	};
</script>

<Row class="cs-input-base-cont">
	{#if prefix}
		<Button {...rest.prefix} on:click={handleAnchorClick} class={`cs-input--prefix`} />
	{/if}
	<textarea
		dir="ltr"
		{...rest}
		onchange={handleChange}
		onblur={handleBlur}
		bind:value
		bind:this={textarea}
		class="cs-input-base {rest.class}"
		on:validate
	/>
	{#if suffix}
		<Button {...rest.suffix} onclick={handleAnchorClick} class={`cs-input--postfix`} />
	{/if}
</Row>
