<script lang="ts">
	import Option from '../option.svelte';
	import { MONTHS } from '$lib/domains';

	interface MonthPresetAttributes {
		selected?: string;
	}

	const { selected }: MonthPresetAttributes = $props();
</script>

{#each MONTHS as month}
	<Option value={month.idx + ''} selected={selected === month.idx + ''}>
		{month.name}
	</Option>
{/each}
