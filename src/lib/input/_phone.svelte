<script lang="ts">
	import BaseInput from './_base.svelte';
	import Phone from '../domains/_/phone';
	import type { BaseInputAttributes } from './_utils';

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
