<script lang="ts">
	import Option from '../option.svelte';

	interface MonthPresetAttributes {
		selected?: string;
	}

	const { selected }: MonthPresetAttributes = $props();
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
</script>

{#each months as month, i}
	<Option value={i + 1 + ''} selected={selected === i + 1 + ''}>{month}</Option>
{/each}
