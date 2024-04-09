<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';
	import { Email } from '$lib/domains';

	interface EmailInputAttributes extends BaseInputAttributes {}

	let {
		_this = $bindable(),
		error = $bindable(),
		value = $bindable(),
		...rest
	}: EmailInputAttributes = $props();

	function rule(value: string) {
		return new Email(value);
	}
</script>

<BaseInput
	{...rest}
	type="email"
	autocomplete="email"
	autocapitalize="off"
	autocorrect="off"
	spellcheck="false"
	rules={{
		rule,
		...rest.rules
	}}
	bind:_this
	bind:value
	bind:error
/>
