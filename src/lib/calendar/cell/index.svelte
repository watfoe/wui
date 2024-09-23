<script lang="ts" module>
	import type { Day } from '$lib/domains';
	import { LikeButton } from '$lib/likebutton';
	import { Text, type TextAttributes } from '$lib/text';

	type CalendarDayCellAttributes = TextAttributes & {
		day: Day;
		header?: boolean;
		showdate?: boolean;
		showlabel?: 'short' | 'abbr' | 'name';
		value?: number;
		minified?: boolean;
	};
</script>

<script lang="ts">
	let {
		color,
		day,
		header,
		showdate = true,
		showlabel,
		minified,
		size,
		value
	}: CalendarDayCellAttributes = $props();

	let isToday = $state(day.isToday());
	let date = $state(day.date());
	let isPhantom = $state(day.isPhantom());

	$effect.pre(() => {
		isToday = day.isToday();
		date = day.date();
		isPhantom = day.isPhantom();
	});
</script>

{#snippet header_snip(showlabel: CalendarDayCellAttributes['showlabel'])}
	{#if showlabel === 'short'}
		{day.short()}
	{:else if showlabel === 'abbr'}
		{day.abbr()}
	{:else if showlabel === 'name'}
		{day.name()}
	{/if}
{/snippet}

<LikeButton
	element="div"
	role="cell"
	aria-label="{day.name()}, {day.month().name()} {day.date()} {day.year()}"
	align={minified ? 'center' : 'flex-start'}
	justify="center"
	class="Wcal__cell"
	color="black"
	width={minified ? 'md' : '100%'}
	height={minified ? 'md' : '100%'}
	variant="plain"
	p="xs"
	clickable
>
	{#if showlabel}
		<Text variant="body" color="neutral" textcolorweight="6" {size}>
			{@render header_snip(showlabel)}
		</Text>
	{/if}

	{#if showdate}
		<Text
			variant="body"
			color={isPhantom ? 'neutral' : isToday ? 'primary' : 'inherit'}
			colorweight={isPhantom ? '6' : undefined}
			bold={isToday}
			underline={isToday}
			class="Wcal__cell__value"
			{size}
		>
			{#if !minified && date === 1}
				{day.month().abbr()}
			{/if}
			{date}
		</Text>
	{/if}
</LikeButton>
