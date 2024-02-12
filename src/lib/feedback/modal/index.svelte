<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ModalAttributes extends HTMLAttributes<HTMLDivElement> {
		id: string;
		title?: string;
		showclose?: boolean;
		class?: string;
	}
</script>

<script lang="ts">
	import './style.css';

	import { Backdrop } from '$lib/feedback';
	import { Col, Row } from '$lib/layout';
	import { Button } from '$lib/button';
	import { Text } from '$lib/typography';
	import { onMount } from 'svelte';

	let { id, title, showclose = true, ...rest } = $props<ModalAttributes>();

	onMount(() => {
		if (!id) {
			throw new Error('An id prop must be added to the <Modal /> element');
		}
	});

	function click(e: CustomEvent) {
		e.stopPropagation();
	}
</script>

<Backdrop {id}>
	<Col
		role="dialog"
		aria-modal="true"
		tabindex={-1}
		aria-label="Modal"
		class="WuiModal {rest.class || ''}"
		on:click={click}
	>
		{#if showclose || title || $$slots.header}
			<Row justify="space-between" gap="lg" class="WuiModal__header">
				{#if $$slots.header}
					<slot name="header" />
				{:else if title}
					<Text variant="title" size="sm">{title}</Text>
				{/if}
				<form>
					<Button
						variant="soft"
						color="neutral"
						size="sm"
						prefix="close"
						class="WuiModal__close-button"
						value="cancel"
						formmethod="dialog"
					/>
				</form>
			</Row>
		{/if}

		<Col class="WuiModal__body">
			<slot />
		</Col>
	</Col>
</Backdrop>
