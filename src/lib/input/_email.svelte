<script lang="ts">
	import BaseInput, { type BaseInputAttributes } from './_base.svelte';
	import Email from '../domains/_/email';

	interface EmailInputAttributes extends BaseInputAttributes {}

	let { error = $bindable(), value = $bindable(), ...rest }: EmailInputAttributes = $props();

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
	bind:value
	bind:error
/>
