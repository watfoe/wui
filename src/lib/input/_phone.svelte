<script lang="ts">
	import BaseInput from './_base.svelte';
	import Phone from '../domains/_/phone';
	import type { BaseInputAttributes } from './_utils';
	import { Select } from '$lib/select';

	interface PhoneInputAttributes extends BaseInputAttributes {}

	let {
		color,
		error = $bindable(),
		size = 'md',
		value = $bindable(),
		...rest
	}: PhoneInputAttributes = $props();

	function rule(value: string) {
		return new Phone(value);
	}
</script>

<BaseInput
	{color}
	{size}
	{...rest}
	autocomplete="tel"
	rules={{
		rule,
		...rest.rules
	}}
	bind:value
	bind:error
>
	{#snippet prefix()}
		<Select
			{color}
			{size}
			height="100%"
			variant="plain"
			preset="country"
			showindicator={false}
			selected="KE"
		/>
	{/snippet}
</BaseInput>
