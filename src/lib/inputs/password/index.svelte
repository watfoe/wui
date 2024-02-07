<script lang="ts">
	import { Button } from '$lib/button';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	interface PasswordInputAttributes extends BaseInputAttributes {
		secure: boolean;
	}

	let {
		color = 'neutral',
		element,
		error,
		value = '',
		secure = true,
		...rest
	} = $props<PasswordInputAttributes>();

	function toggle() {
		secure = !secure;
	}
</script>

<BaseInput
	{...rest}
	autocomplete="password"
	type={secure ? 'password' : 'text'}
	autocapitalize="off"
	autocorrect="off"
	spellcheck="false"
	suffix="visibility"
	bind:element
	bind:error
	bind:value
>
	<Button
		variant="plain"
		{color}
		size="sm"
		slot="suffix"
		prefix={secure ? 'visibility' : 'visibility_off'}
		on:click={toggle}
	/>
</BaseInput>
