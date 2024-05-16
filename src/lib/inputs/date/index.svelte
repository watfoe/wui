<script context="module" lang="ts">
	export interface DateInputAttributes extends BaseInputAttributes {
		value?: string;
		defaultmonth?: string;
		defaultday?: string;
		defaultyear?: string;
		format?: DateFormat;
	}
</script>

<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import Row from '$lib/layout/row/index.svelte';
	import Select from '../select/index.svelte';
	import { ValidationError } from '../_common_';
	import { untrack } from 'svelte';
	import { splitDate, type DateFormat } from '$lib/utils/_date';

	let day = $state('');
	let month = $state('');
	let year = $state('');

	let {
		color,
		disabled,
		error = $bindable(),
		id,
		format = 'yyyy-mm-dd',
		name,
		required,
		rules,
		size,
		shape,
		validateon = 'submit',
		value = $bindable(),
		variant,
		...rest
	}: DateInputAttributes = $props();

	let input_el: HTMLInputElement;

	$effect.pre(() => {
		untrack(() => {
			if (value) {
				let [_day, _month, _year] = splitDate(value, format)!;
				day = _day;
				month = _month;
				year = _year;
			}
		});
	});

	$effect(() => {
		untrack(() => {
			if (required && !rules?.required) {
				rules = rules || {};
				rules.required = true;
			}

			if (rules && validateon === 'submit') {
				// Get the form element that this input is in
				const form = input_el?.closest('form');
				form?.addEventListener('submit', (e: Event) => {
					e.preventDefault();
					validate();
				});
			}
		});
	});

	const DATE_FORMART_TO_LOCALE = {
		'mm/dd/yyyy': 'en-US',
		'dd/mm/yyyy': 'en-GB',
		'yyyy/mm/dd': 'zh-CN',
		'yyyy-mm-dd': 'en-CA',
		'dd-mm-yyyy': 'es-CL'
	};

	function change(e: Event) {
		e.stopImmediatePropagation();
		validate();
	}

	function blur(e: Event) {
		if (validateon === 'blur') {
			validate();
		}
	}

	function validate() {
		if (day !== '' && month !== '' && year !== '') {
			const date = new Date(`${month}/${day}/${year}`);

			if (date.toString() !== 'Invalid Date') {
				const locale = DATE_FORMART_TO_LOCALE[format!] || 'en-CA';
				_dipatch(
					date.toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })
				);
			} else {
				_dipatch('', new ValidationError('Please enter a valid date'));
			}
		} else {
			_dipatch('', new ValidationError('Please enter a valid date'));
		}
	}

	function _dipatch(_value: string, _error?: ValidationError) {
		value = _value;
		input_el!.value = _value;
		error = _error;
		input_el?.dispatchEvent(
			new Event('change', {
				bubbles: true
			})
		);
	}
</script>

<Row gap="sm">
	<Select
		placeholder="Month"
		preset="month"
		{id}
		{required}
		{variant}
		{color}
		{size}
		{shape}
		{disabled}
		validateon={validateon === 'input' ? 'change' : validateon}
		onchange={change}
		onblur={blur}
		selected={month}
		bind:value={month}
		bind:error
	/>

	<BaseInput
		type="number"
		placeholder="Day"
		align="center"
		masks={{ max: 31 }}
		maxlength={2}
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{variant}
		{color}
		{size}
		{shape}
		{validateon}
		{disabled}
		onchange={change}
		onblur={blur}
		bind:value={day}
		bind:error
	/>

	<BaseInput
		type="number"
		placeholder="Year"
		align="center"
		maxlength={4}
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{variant}
		{color}
		{size}
		{shape}
		{validateon}
		{disabled}
		onchange={change}
		onblur={blur}
		bind:value={year}
		bind:error
	/>

	<input
		{...rest}
		tabindex="-1"
		aria-hidden="true"
		{name}
		class="WuiHidden"
		bind:this={input_el}
		bind:value
	/>
</Row>
