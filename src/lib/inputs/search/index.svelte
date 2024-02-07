<script lang="ts">
	import { Button } from '$lib/button';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	type SearchInputAttributes = BaseInputAttributes;

	let { color = 'neutral', element, error, value = '', ...rest } = $props<SearchInputAttributes>();

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
	bind:element
	bind:error
	bind:value
>
	<Button variant="plain" {color} size="sm" slot="suffix" prefix="clear" onclick={clear} />
</BaseInput>
