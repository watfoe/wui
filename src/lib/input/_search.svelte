<script lang="ts">
	import { Button } from '../button';
	import BaseInput, { type BaseInputAttributes } from './_base.svelte';

	let {
		color = 'neutral',
		error = $bindable(),
		value = $bindable(),
		variant,
		...rest
	}: BaseInputAttributes = $props();

	function clear() {
		value = '';
	}
</script>

<BaseInput
	{...rest}
	role="searchbox"
	aria-label="Search"
	autocomplete="search"
	autocapitalize="off"
	autocorrect="off"
	spellcheck="false"
	type="text"
	{variant}
	{color}
	bind:value
	bind:error
>
	{#snippet suffix()}
		<Button
			{color}
			variant={variant === 'outlined' ? 'plain' : variant}
			size="sm"
			prefix="clear"
			onclick={clear}
		/>
	{/snippet}
</BaseInput>
