<script lang="ts">
	import { COUNTRIES } from '../../domains/_/country';
	import Option from '../option.svelte';

	interface CountryPresetAttributes {
		selected?: string;
	}

	const { selected }: CountryPresetAttributes = $props();
</script>

{#each COUNTRIES as country}
	<Option value={country.c} selected={selected === country.c}>
		<img src="https://flagcdn.com/w20/{country.c}.png" width="16" height="12" alt={country.n} />
		{country.n}
	</Option>
{/each}
