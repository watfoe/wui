<script lang="ts">
	import Option from '../option.svelte';
	import { DAYS } from '$lib/domains';

	interface DayPresetAttributes {
		selected?: string;
	}

	const { selected }: DayPresetAttributes = $props();
</script>

{#each DAYS as day}
	<Option value={day.idx + ''} selected={selected === day.idx + ''}>{day.name}</Option>
{/each}
