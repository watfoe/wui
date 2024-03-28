<script lang="ts">
	import { Month } from '$lib/domains';
	import Option from '../option.svelte';

	const { selected } = $props<{ selected?: string }>();
	const months = Month.list();
</script>

{#each months as month, i}
	<Option value={i + 1 + ''} selected={selected === i + 1 + ''}>{month}</Option>
{/each}
