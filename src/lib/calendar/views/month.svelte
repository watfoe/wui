<script lang="ts" module>
	export interface CalendarViewMonthAttributes {
		month: Month;
		minified?: boolean;
	}
</script>

<script lang="ts">
	import Cell from '../cell/index.svelte';
	import { Month, Week } from '$lib/domains';
	import { Surface } from '$lib/surface';

	let { month, minified }: CalendarViewMonthAttributes = $props();
	let size: 'sm' | 'md' = minified ? 'sm' : 'md';
	let label: 'short' | 'abbr' = minified ? 'short' : 'abbr';

	let weeks = $derived(month.weeks());

	$effect.pre(() => {
		// Add empty weeks to make the calendar 6 weeks tall
		if (weeks.length < 6) {
			let week = new Week(weeks.length, month);
			weeks.push(week);
		}
	});
</script>

<Surface
	element="div"
	class="Wcal-root {minified ? 'Wcal-root--min' : ''}"
	color="neutral"
	colorweight="1"
	textcolor="black"
	height={minified ? 'auto' : '100%'}
	width={minified ? 'auto' : '100%'}
	variant={minified ? 'plain' : 'outlined'}
	shape="rounded"
>
	{#each weeks[0].days() as day}
		<Cell {day} showlabel={label} {size} color="neutral" showdate={false} header />
	{/each}

	{#each weeks as week}
		{#each week.days() as day}
			<Cell {day} {size} {minified} />
		{/each}
	{/each}
</Surface>
