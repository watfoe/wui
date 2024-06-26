<script lang="ts">
	import { Icon } from '$lib/icon';
	import { Button } from '../button';
	import BaseInput, { type BaseInputAttributes } from './_base.svelte';

	let {
		color = 'neutral',
		size,
		error = $bindable(),
		value = $bindable(),
		variant,
		...rest
	}: BaseInputAttributes = $props();

	let len = $derived((value || '').length);

	function clear() {
		value = '';
	}
</script>

<BaseInput
	role="searchbox"
	aria-label="Search"
	autocomplete="search"
	autocapitalize="off"
	autocorrect="off"
	placeholder="Search"
	spellcheck="false"
	type="text"
	{variant}
	{color}
	{size}
	{...rest}
	bind:value
	bind:error
>
	{#snippet prefix()}
		<Icon {color} {size} style="opacity:0.6">search</Icon>
	{/snippet}
	{#snippet suffix()}
		<Button
			{color}
			{size}
			prefix="clear"
			textcolor="inherit"
			variant="plain"
			style={len === 0 ? 'display:none;' : undefined}
			onclick={clear}
		/>
	{/snippet}
</BaseInput>
