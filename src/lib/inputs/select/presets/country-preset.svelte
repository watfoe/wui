<script lang="ts">
	import { Country } from '$lib/domains';
	import Option from '../option.svelte';

	const { selected } = $props<{ selected?: string }>();
	const countries = Country.list();
</script>

{#each countries as country}
	<Option value={country.code} selected={selected === country.code}>{country.name}</Option>
{/each}
