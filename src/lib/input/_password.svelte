<script lang="ts">
	import { Button } from '../button';
	import BaseInput, { type BaseInputAttributes } from './_base.svelte';

	interface PasswordInputAttributes extends BaseInputAttributes {
		secure: boolean;
	}

	let {
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
	bind:value
	bind:error
>
	{#snippet suffix()}
		<Button
			variant={variant === 'outlined' ? 'plain' : variant}
			{color}
			size="sm"
			prefix={secure ? 'visibility' : 'visibility_off'}
			onclick={() => (secure = !secure)}
		/>
	{/snippet}
</BaseInput>
