<script lang="ts">
	import { Button } from '$lib/buttons';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	interface PasswordInputAttributes extends BaseInputAttributes {
		secure: boolean;
	}

	let {
		_this = $bindable(),
		color = 'neutral',
		error = $bindable(),
		value = $bindable(),
		variant = 'plain',
		secure = true,
		...rest
	}: PasswordInputAttributes = $props();
</script>

<BaseInput
	{...rest}
	{color}
	{variant}
	autocomplete="password"
	type={secure ? 'password' : 'text'}
	autocapitalize="off"
	autocorrect="off"
	spellcheck="false"
	suffix="visibility"
	bind:_this
	bind:value
	bind:error
>
	<Button
		variant={variant === 'outlined' ? 'plain' : variant}
		{color}
		size="sm"
		slot="suffix"
		prefix={secure ? 'visibility' : 'visibility_off'}
		onclick={() => (secure = !secure)}
	/>
</BaseInput>
