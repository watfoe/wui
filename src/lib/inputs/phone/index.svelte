<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import { Phone } from '$lib/domains';

	interface PhoneInputAttributes extends BaseInputAttributes {}

	let { _this, error, value, ...rest } = $props<PhoneInputAttributes>();

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
	bind:_this
	bind:value
	bind:error
/>
