<script lang="ts">
	import { Month } from '$lib/domains';
	import Option, { type OptionAttributes } from '../option.svelte';

	interface MonthPresetAttributes {
		selected?: string;
	}

	const { selected }: MonthPresetAttributes = $props();
	const months = Month.list();
</script>

{#each months as month, i}
	<Option value={i + 1 + ''} selected={selected === i + 1 + ''}>{month}</Option>
{/each}
