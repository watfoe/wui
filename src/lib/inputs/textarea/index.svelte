<script context="module" lang="ts">
	import type { BaseProps } from '../_common_';
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	export type TextAreaAttributes = Omit<BaseProps<HTMLTextareaAttributes>, 'id'> & {
		label?: Snippet | string;
		name?: string;
		description?: Snippet | string;
		hidden?: boolean;
		textarea?: HTMLTextAreaElement;
		type?: 'date' | 'email' | 'name' | 'number' | 'password' | 'pin' | 'phone' | 'search' | 'text';
	};
</script>

<script lang="ts">
	import './style.css';
	import ErrorText from '../error/index.svelte';
	import { validate, mask, ValidationError } from '../_common_';
	import { Icon } from '$lib/display';
	import { untrack, type Snippet } from 'svelte';
	import { Surface } from '$lib/utils';
	import { Label } from '..';

	let {
		align = 'left',
		class: _class = '',
		color = 'neutral',
		description,
		disabled,
		error = $bindable(),
		gap,
		height = 89,
		hidden,
		label,
		fontsize,
		masks,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		p = 7,
		px,
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
		textarea = $bindable(),
		validateon = 'submit',
		value = $bindable(),
		variant = 'outlined',
		width,
		oninput,
		onblur,
		onvalidate,
		...rest
	}: TextAreaAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);

	$effect(() => {
		textarea?.setCustomValidity(error === undefined ? '' : error?.message);

		untrack(() => {
			if (required && !rules?.required) {
				rules = rules || {};
				rules.required = true;
			}

			if (rules && validateon === 'submit') {
				// Get the form element that this input is in
				const form = textarea?.closest('form');
				form?.addEventListener(
					'submit',
					(e) => {
						_validate(textarea?.value!);
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

	function blur(e: FocusEvent & { currentTarget: HTMLTextAreaElement }) {
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

	function input(e: Event & { currentTarget: HTMLTextAreaElement }) {
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
	align="flex-start"
	element="fieldset"
	direction="column"
	class="WuiTextArea__root WuiTextArea--{color} {_class}"
	justify="flex-start"
	{disabled}
	{gap}
	{m}
	{mx}
	{my}
	{mt}
	{mr}
	{mb}
	{ml}
	{hidden}
	{width}
>
	<!-- This might seem repetitive but with how the Label is defined, it ensures that it
  doesn't leave an unintended empty description helper text -->
	{#if label}
		<Label for={id} {description}>{label}</Label>
	{/if}

	<Surface
		align="flex-start"
		class="WuiTextArea {_class}"
		color={error ? 'danger' : color}
		direction="row"
		gap="xs"
		justify="space-between"
		width="100%"
		fontsize={fontsize || size}
		{height}
		{p}
		{px}
		{py}
		{pt}
		{pr}
		{pb}
		{pl}
		{shape}
		{style}
		{variant}
	>
		{#if typeof prefix === 'string'}
			<Icon color="inherit" {size}>{prefix}</Icon>
		{:else if prefix}
			<div
				class="WuiTextArea__prefix"
				style:height="calc(var(--height-{size}) - 4px)"
				style:width="calc(var(--height-{size}) - 4px)"
			>
				{@render prefix()}
			</div>
		{/if}

		<textarea
			class="WuiTextArea__input WuiText WuiText--body WuiText--{size}"
			style="text-align:{align};font-size:inherit;"
			onblur={blur}
			oninput={input}
			style:width="100%"
			style:height="100%"
			bind:this={textarea}
			bind:value
			{...rest}
		></textarea>

		{#if typeof suffix === 'string'}
			<Icon color="inherit" {size}>{suffix}</Icon>
		{:else if suffix}
			<div
				class="WuiTextArea__suffix"
				style:height="calc(var(--height-{size}) - 4px)"
				style:width="calc(var(--height-{size}) - 4px)"
			>
				{@render suffix()}
			</div>
		{/if}
	</Surface>

	{#if error}
		<ErrorText {error} />
	{/if}
</Surface>
