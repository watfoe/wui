<script lang="ts">
	import { Button } from '$lib/buttons';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	let {
		_this = $bindable(),
		color = 'neutral',
		error = $bindable(),
		value = $bindable(),
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
	{color}
	bind:_this
	bind:value
	bind:error
>
	<Button variant="plain" {color} size="sm" slot="suffix" prefix="clear" onclick={clear} />
</BaseInput>
