<script context="module" lang="ts">
	export interface DateInputAttributes extends BaseInputAttributes {
		value?: string;
		defaultmonth?: string;
		defaultday?: string;
		defaultyear?: string;
		format?: 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'yyyy-mm-dd' | 'dd-mm-yyyy';
	}
</script>

<script lang="ts">
	import { Row } from '$lib/layout';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import Select from '../select/index.svelte';
	import { ValidationError } from '../_common_';
	import { onMount } from 'svelte';

	let day = '';
	let month = '';
	let year = '';

	let {
		id,
		element,
		error,
		format = 'yyyy-mm-dd',
		name,
		required,
		rules,
		validateon = 'submit',
		value = '',
		...rest
	} = $props<DateInputAttributes>();

	onMount(() => {
		if (required && !rules?.required) {
			rules = rules || {};
			rules.required = true;
		}

		if (rules && validateon === 'submit') {
			// Get the form element that this input is in
			const form = element?.closest('form');
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
		element!.value = _value;
		error = _error;
		element?.dispatchEvent(
			new Event('change', {
				bubbles: true
			})
		);
	}
</script>

<Row justify="space-between" gap="nm" class="WuiInput__date" on:change on:*>
	<Select
		placeholder="Month"
		{...rest}
		preset="month"
		{id}
		{required}
		{validateon}
		bind:value={month}
		bind:error
		on:change={change}
		on:blur={blur}
	/>

	<BaseInput
		type="number"
		placeholder="Day"
		masks={{ max: 31 }}
		{...rest}
		maxlength={2}
		class="WuiInput__date__day"
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{validateon}
		bind:value={day}
		bind:error
		on:change={change}
		on:blur={blur}
	/>

	<BaseInput
		type="number"
		placeholder="Year"
		{...rest}
		maxlength={4}
		class="WuiInput__date__year"
		rules={{
			required: required ? 'Please enter a valid date' : undefined
		}}
		{validateon}
		bind:value={year}
		bind:error
		on:change={change}
		on:blur={blur}
	/>

	<input
		bind:this={element}
		tabindex="-1"
		aria-hidden="true"
		{name}
		bind:value
		style="clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;left:50%;bottom:0"
	/>
</Row>

<style>
	:global(.WuiInput__date) {
		border-radius: inherit;
	}
	:global(.WuiInput__date__month, .WuiInput__date__day, .WuiInput__date__year) {
		width: 100%;
	}
	:global(.WuiInput__date__day, .WuiInput__date__year) {
		text-align: center;
		padding: 0;
	}
</style>
