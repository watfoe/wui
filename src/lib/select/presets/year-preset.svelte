<script lang="ts">
	import Option from '../option.svelte';

	interface YearPresetAttributes {
		selected?: string;
	}

	const { selected }: YearPresetAttributes = $props();
</script>

{#each Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i) as year}
	<Option value={year + ''} selected={selected === year + ''}>
		{year}
	</Option>
{/each}
