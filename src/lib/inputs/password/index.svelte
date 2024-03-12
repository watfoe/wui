<script lang="ts">
	import { Button } from '$lib/buttons';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	interface PasswordInputAttributes extends BaseInputAttributes {
		secure: boolean;
	}

	let {
		_this,
		color = 'neutral',
		error,
		value,
		secure = true,
		...rest
	} = $props<PasswordInputAttributes>();
</script>

<BaseInput
	{...rest}
	{color}
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
		variant="plain"
		{color}
		size="sm"
		slot="suffix"
		prefix={secure ? 'visibility' : 'visibility_off'}
		onclick={() => (secure = !secure)}
	/>
</BaseInput>
