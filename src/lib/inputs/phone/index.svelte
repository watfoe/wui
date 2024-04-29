<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import { Phone } from '$lib/domains';

	interface PhoneInputAttributes extends BaseInputAttributes {}

	let { error = $bindable(), value = $bindable(), ...rest }: PhoneInputAttributes = $props();

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
	bind:value
	bind:error
/>
