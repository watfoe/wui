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
	import './style.css';
	import { Row } from '$lib/layout';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import Select from '../select/index.svelte';
	import { ValidationError } from '../_common_';
	import { onMount, untrack } from 'svelte';
	import { splitDate, type DateFormat } from '$lib/utils';

	let day = $state('');
	let month = $state('');
	let year = $state('');

	let {
		_this,
		color,
		id,
		error,
		format = 'yyyy-mm-dd',
		name,
		required,
		rules,
		size,
		validateon = 'submit',
		value,
		variant,
		...rest
	} = $props<DateInputAttributes>();

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
				validate();
			});
		}
	});

	const DATE_FORMART_TO_LOCALE = {
		'mm/dd/yyyy': 'en-US',
		'dd/mm/yyyy': 'en-GB',
		'yyyy/mm/dd': 'zh-CN',
		'yyyy-mm-dd': 'en-CA',
		'dd-mm-yyyy': 'es-CL'
	};

	function change(e: Event) {
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
		_this!.value = _value;
		error = _error;
		_this?.dispatchEvent(
			new Event('change', {
				bubbles: true
			})
		);
	}
</script>

<Row justify="space-between" gap="nm" class="WuiInput__date">
	<Select
		placeholder="Month"
		preset="month"
		{id}
		{required}
		validateon={validateon === 'input' ? 'change' : validateon}
		{variant}
		{color}
		{size}
		onchange={change}
		onblur={blur}
		selected={month}
		bind:value={month}
		bind:error
	/>

	<BaseInput
		type="number"
		placeholder="Day"
		masks={{ max: 31 }}
		maxlength={2}
		class="WuiInput__date__day"
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{variant}
		{color}
		{size}
		{validateon}
		onchange={change}
		onblur={blur}
		bind:value={day}
		bind:error
	/>

	<BaseInput
		type="number"
		placeholder="Year"
		maxlength={4}
		class="WuiInput__date__year"
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{variant}
		{color}
		{size}
		{validateon}
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
		style="clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;left:50%;bottom:0"
		bind:this={_this}
		bind:value
	/>
</Row>
