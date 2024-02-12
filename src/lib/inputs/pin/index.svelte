<script context="module" lang="ts">
	export interface PinInputAttributes extends BaseInputAttributes {
		length?: number;
		secure?: boolean;
	}
</script>

<script lang="ts">
	import { Row } from '$lib/layout';
	import { onMount } from 'svelte';
	import BaseInput, { type BaseInputAttributes } from '../base/index.svelte';

	let { length = 6, ...rest } = $props<PinInputAttributes>();
	let inputs: BaseInput[] = [];

	onMount(() => {
		// inputs.fill(1, 0, length);
		// inputs[0].focus();
	});
</script>

<Row justify="space-between">
	{#each inputs as input, i}
		<BaseInput type="number" maxlength={1} />
	{/each}
</Row>
