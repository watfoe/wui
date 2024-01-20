<script lang="ts">
	import { Country } from '$lib/domains';
	import Option from '../option.svelte';
	const countries = Country.list();
</script>

{#each countries as country}
	<Option value={country.code}>{country.name}</Option>
{/each}
