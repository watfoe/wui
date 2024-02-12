<script lang="ts">
	import { Button } from '$lib/button';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	let { _this, error, color = 'neutral', value, ...rest } = $props<BaseInputAttributes>();

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
