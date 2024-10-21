<script lang="ts">
	import './style.css';
	import { validate, mask, ValidationError, type BaseInputAttributes } from './_utils';
	import { Icon } from '../icon';
	import { Surface } from '../surface';
	import { untrack } from 'svelte';
	import { on } from 'svelte/events';

	let {
		align = 'left',
		class: _class,
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
	let closest_form: HTMLFormElement;
	let form_submit_listener: (() => void) | undefined = undefined;

	$effect(() => {
		input_el?.setCustomValidity(
			error === undefined ? '' : typeof error === 'string' ? error : error?.message
		);

		closest_form = input_el?.closest('form')!;

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

	function validate_on_submit() {
		if (closest_form) {
			form_submit_listener = on(
				closest_form!,
				'submit',
				(e) => {
					_validate(input_el?.value!);
					if (error) {
						e.preventDefault();
					} else if (form_submit_listener) {
						form_submit_listener();
						form_submit_listener = undefined;
					}
				},
				// Capture phase to ensure that this event listener is the first to run
				{ capture: true }
			);
		}
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
		if (form_submit_listener === null && rules && validateon === 'submit') {
			// Re-add the event listener if it was removed
			validate_on_submit();
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
		<div class="w-input__prefix" style:min-width="calc(var(--height-{size}) - 6px)">
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
		items="center"
		class="w-input {_class}"
		color={error ? 'error' : disabled ? 'neutral' : color}
		colorweight={colorweight ||
			(!error && color === 'neutral' && variant === 'outlined'
				? '4'
				: variant === 'plain'
					? '0'
					: undefined)}
		direction="row"
		gap="xs"
		height={height || size}
		justify="between"
		pr={typeof suffix === 'function' ? undefined : pr || px}
		pl={typeof prefix === 'function' ? undefined : pl || px}
		textsize={textsize || size}
		shape={shape === 'circle' ? 'pill' : shape}
		style="cursor:text;{style}"
		variant={variant === 'plain' ? 'soft' : variant}
		width="100%"
		{disabled}
		{textcolor}
		{textcolorweight}
		{textweight}
		{textbold}
		{textitalic}
		{textunderline}
		{textvariant}
		{p}
		{py}
		{pt}
		{pb}
		onclick={disabled ? undefined : () => input_el.focus()}
	>
		{#if prefix || suffix}
			{@render internal()}
		{/if}
	</Surface>
{:else}
	<Surface
		element="input"
		class="w-input{_class ? ` ${_class}` : ''}"
		color={error ? 'error' : disabled ? 'neutral' : color}
		colorweight={colorweight || (variant === 'plain' ? '0' : undefined)}
		height={height || size}
		pr={pr || px}
		pl={pl || px}
		onblur={blur}
		oninput={input}
		shape={shape === 'circle' ? 'pill' : shape}
		style="text-align:{align};{style}"
		textsize={textsize || size}
		variant={variant === 'plain' ? 'soft' : variant}
		width="100%"
		bind:_this={input_el}
		{value}
		{disabled}
		{textcolor}
		{textcolorweight}
		{textweight}
		{textbold}
		{textitalic}
		{textunderline}
		{textvariant}
		{p}
		{py}
		{pt}
		{pb}
		{...rest}
	/>
{/if}
