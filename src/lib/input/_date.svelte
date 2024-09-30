<script lang="ts" module>
	export interface DateInputAttributes extends Omit<BaseInputAttributes, 'prefix' | 'suffix'> {
		value?: string;
		defaultmonth?: string;
		defaultday?: string;
		defaultyear?: string;
		format?: DateFormat;
	}
</script>

<script lang="ts">
	import { Row } from '../row';
	import { Select } from '../select';
	import { ValidationError, splitDate, type BaseInputAttributes, type DateFormat } from './_utils';
	import { untrack } from 'svelte';
	import Option from '$lib/select/option.svelte';
	import { MONTHS } from '$lib/domains';

	let day = $state('');
	let month = $state('');
	let year = $state('');

	let {
		color,
		defaultday,
		defaultmonth,
		defaultyear,
		disabled,
		error = $bindable(),
		id,
		format = 'yyyy-mm-dd',
		height,
		m,
		mx,
		my,
		mb,
		ml,
		mt,
		mr,
		name,
		p,
		px,
		py,
		pb,
		pl,
		pt,
		pr,
		required,
		rules,
		size,
		shape,
		validateon = 'submit',
		value = $bindable(),
		variant,
		width = '100%',
		...rest
	}: DateInputAttributes = $props();

	let input_el: HTMLInputElement;
	let submit_event_removed = false;

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
				validate_on_submit();
			}
		});
	});

	function try_form_submit(e: SubmitEvent) {
		validate();
		if (error) {
			e.preventDefault();
		} else {
			// Remove the event listener after the form is submitted successfully
			(e.currentTarget as HTMLFormElement).removeEventListener('submit', try_form_submit, true);
			submit_event_removed = true;
		}
	}

	function validate_on_submit() {
		const form = input_el?.closest('form');
		// Capture phase to ensure that this event listener is the first to run
		form?.addEventListener('submit', try_form_submit, true);
	}

	const DATE_FORMART_TO_LOCALE = {
		'mm/dd/yyyy': 'en-US',
		'dd/mm/yyyy': 'en-GB',
		'yyyy/mm/dd': 'zh-CN',
		'yyyy-mm-dd': 'en-CA',
		'dd-mm-yyyy': 'es-CL'
	};

	function change(e: Event) {
		if (submit_event_removed && rules && validateon === 'submit') {
			// Re-add the event listener if it was removed
			validate_on_submit();
			submit_event_removed = false;
		}

		e.stopImmediatePropagation();
		validate();
	}

	function blur() {
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

<Row align="start" gap="sm" {m} {mx} {my} {mb} {ml} {mt} {mr} {p} {pb} {pl} {pt} {pr} {width}>
	<Select
		placeholder="Month"
		preset="month"
		selected={defaultmonth}
		validateon={validateon === 'input' ? 'change' : validateon}
		onchange={change}
		onblur={blur}
		width="100%"
		style="width:33.3%"
		bind:value={month}
		bind:error
		{color}
		{disabled}
		{height}
		{id}
		{required}
		{size}
		{shape}
		{variant}
	/>

	<Select
		placeholder="Day"
		selected={defaultday}
		validateon={validateon === 'input' ? 'change' : validateon}
		onchange={change}
		onblur={blur}
		width="100%"
		style="width:33.3%"
		bind:value={day}
		bind:error
		{color}
		{disabled}
		{height}
		{id}
		{required}
		{size}
		{shape}
		{variant}
	>
		{#each Array.from({ length: month ? MONTHS[month].max : 31 }, (_, i) => i + 1) as day}
			<Option value={day + ''}>{day}</Option>
		{/each}
	</Select>

	<Select
		placeholder="Year"
		preset="year"
		selected={defaultyear}
		validateon={validateon === 'input' ? 'change' : validateon}
		onchange={change}
		onblur={blur}
		width="100%"
		style="width:33.3%"
		bind:value={year}
		bind:error
		{color}
		{disabled}
		{height}
		{id}
		{required}
		{size}
		{shape}
		{variant}
	/>

	<input
		{...rest}
		tabindex="-1"
		aria-hidden="true"
		{name}
		class="w-hidden"
		bind:this={input_el}
		bind:value
	/>
</Row>
