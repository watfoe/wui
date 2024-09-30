<script lang="ts" module>
	export type TextAreaAttributes = Omit<BaseInputAttributes<'textarea'>, 'id'> & {
		label?: Snippet | string;
		name?: string;
		description?: Snippet | string;
		hidden?: boolean;
	};
</script>

<script lang="ts">
	import './style.css';
	import { InputError } from '../inputerror';
	import { Icon } from '../icon';
	import { InputLabel } from '../inputlabel';
	import { Surface } from '../surface';
	import { validate, mask, ValidationError, type BaseInputAttributes } from '../input/_utils';
	import { untrack, type Snippet } from 'svelte';
	import { LikeButton } from '$lib/likebutton';

	let {
		_this = $bindable(),
		align = 'left',
		class: _class = '',
		color = 'neutral',
		description,
		disabled,
		error = $bindable(),
		gap = 3,
		height = 89,
		hidden,
		label,
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
		width = '100%',
		oninput,
		onblur,
		onvalidate,
		...rest
	}: TextAreaAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);

	$effect(() => {
		_this?.setCustomValidity(
			error === undefined ? '' : typeof error === 'string' ? error : error?.message
		);

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
	align="start"
	element="fieldset"
	direction="column"
	class="w-textarea__root w-textarea--{color} {_class}"
	justify="start"
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
	{#if label}
		<InputLabel for={id} {color} {description} {size}>{label}</InputLabel>
	{/if}

	<LikeButton
		align="start"
		class="w-textarea {_class}"
		color={error ? 'error' : color}
		clickable={false}
		direction="row"
		gap="xs"
		height="auto"
		justify="between"
		textsize={textsize || size}
		width="100%"
		{disabled}
		{p}
		{px}
		{py}
		{pt}
		{pr}
		{pb}
		{pl}
		{shape}
		{style}
		{textcolor}
		{textcolorweight}
		{textweight}
		{textbold}
		{textitalic}
		{textunderline}
		{textvariant}
		{variant}
	>
		{#if typeof prefix === 'string'}
			<Icon color="inherit" {size}>{prefix}</Icon>
		{:else if prefix}
			<div
				class="w-textarea__prefix"
				style:height="calc(var(--height-{size}) - 4px)"
				style:width="calc(var(--height-{size}) - 4px)"
			>
				{@render prefix()}
			</div>
		{/if}

		<textarea
			class="w-textarea__input"
			style="text-align:{align};font-size:inherit;"
			onblur={blur}
			oninput={input}
			style:width="100%"
			style:font="inherit"
			bind:this={_this}
			bind:value
			{...rest}
		></textarea>

		{#if typeof suffix === 'string'}
			<Icon color="inherit" {size}>{suffix}</Icon>
		{:else if suffix}
			<div
				class="w-textarea__suffix"
				style:height="calc(var(--height-{size}) - 4px)"
				style:width="calc(var(--height-{size}) - 4px)"
			>
				{@render suffix()}
			</div>
		{/if}
	</LikeButton>

	{#if error}
		<InputError {error} />
	{/if}
</Surface>
