<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import { Phone } from '$lib/domains';

	interface PhoneInputAttributes extends BaseInputAttributes {}

	let { element, error, value = '', ...rest } = $props<PhoneInputAttributes>();

	function rule(value: string) {
		return new Phone(value);
	}
</script>

<BaseInput
	{...rest}
	autocomplete="phone"
	rules={{
		rule,
		...rest.rules
	}}
	bind:element
	bind:error
	bind:value
	on:*
/>
