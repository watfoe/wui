<script lang="ts" context="module">
	export interface CalendarAttributes {
		minified?: boolean;
		controls?: {
			prev?: boolean;
			next?: boolean;
			today?: boolean;
			month?: boolean;
			year?: boolean;
		};
		disablefuture?: boolean;
	}
</script>

<script lang="ts">
	import './style.css';
	import CalendarViewMonth from './views/month.svelte';
	import { Row } from '$lib/row';
	import { Tooltip } from '$lib/tooltip';
	import { Button } from '$lib/button';
	import { Icon } from '$lib/icon';
	import { Month } from '$lib/domains';
	import { Select } from '$lib/select';
	import { Input } from '$lib/input';

	let {
		minified,
		controls = {
			prev: true,
			next: true,
			today: true,
			month: true,
			year: true
		}
	}: CalendarAttributes = $props();

	let date = new Date();
	let month_idx = $state(date.getMonth() + '');
	let year = $state(date.getFullYear() + '');
	let month = $derived(new Month(parseInt(month_idx), parseInt(year)));

	function prev() {}
	function next() {}
	function today() {}
</script>

{#if controls}
	<Row justify="space-between" gap="lg" width="100%">
		{#if controls.month || controls.year}
			<Row color="neutral" shape="rounded" variant="soft">
				{#if controls.month}
					<Select
						preset="month"
						size="sm"
						textsize="md"
						textvariant={minified ? 'body' : 'heading'}
						textcolor="black"
						variant="none"
						selected={month_idx}
						showindicator={false}
						bind:value={month_idx}
						textbold
					/>
				{/if}

				{#if controls.year}
					<Input
						type="number"
						size="sm"
						textsize="md"
						textvariant={minified ? 'body' : 'heading'}
						textcolor="black"
						variant="none"
						bind:value={year}
						width={60}
						textbold
					/>
				{/if}
			</Row>
		{/if}

		{#if controls.prev || controls.next || controls.today}
			<Row gap="sm">
				{#if controls.prev}
					<Tooltip title="Previous month" position="bottom-start" size="sm">
						<Button variant="soft" size="sm" color="neutral" onclick={prev}>
							{#snippet prefix()}
								<Icon>chevron_left</Icon>
							{/snippet}
						</Button>
					</Tooltip>
				{/if}

				{#if controls.today}
					<Button
						variant="soft"
						size="sm"
						color="neutral"
						class="Wcal__header__today_btn"
						onclick={today}
					>
						Today
					</Button>
				{/if}

				{#if controls.next}
					<Tooltip title="Next month" position="bottom-end" size="sm">
						<Button variant="soft" size="sm" color="neutral" onclick={next}>
							{#snippet prefix()}
								<Icon>chevron_right</Icon>
							{/snippet}
						</Button>
					</Tooltip>
				{/if}
			</Row>
		{/if}
	</Row>
{/if}

<CalendarViewMonth {month} {minified} />
