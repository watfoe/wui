<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ModalAttributes extends HTMLAttributes<HTMLDivElement> {
		id: string;
		title?: string;
		showclose?: boolean;
		position?: 'top' | 'center' | 'bottom';
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col, Row } from '$lib/layout';
	import { Button } from '$lib/buttons';
	import { Text } from '$lib/typography';
	import { Icon, Tooltip } from '$lib/display';
	import { Backdrop } from '$lib/utils';

	let { id, title, showclose = true, position = 'center', ...rest }: ModalAttributes = $props();
	let backdrop: HTMLDialogElement;

	$effect.pre(() => {
		if (!id) {
			throw new Error('An id prop must be added to the <Modal /> element');
		}
	});

	function click(e: MouseEvent) {
		e.stopPropagation();
	}

	function close() {
		backdrop?.close();
	}
</script>

<Backdrop {id} bind:_this={backdrop}>
	<Col
		role="dialog"
		aria-modal="true"
		tabindex={-1}
		aria-label="Modal"
		class="WuiModal WuiModal--{position} {rest.class || ''}"
		onclick={click}
	>
		{#if showclose || title || $$slots.header}
			<Row justify="space-between" gap="lg" class="WuiModal__header">
				{#if $$slots.header}
					<slot name="header" />
				{:else if title}
					<Text variant="heading" size="sm" tabindex={0}>{title}</Text>
				{/if}

				<Tooltip title="Close">
					<Button
						variant="plain"
						color="neutral"
						size="sm"
						class="WuiModal__close-button"
						onclick={close}
					>
						<Icon slot="prefix" size="md">close</Icon>
					</Button>
				</Tooltip>
			</Row>
		{/if}

		<Col class="WuiModal__body">
			<slot />
		</Col>
	</Col>
</Backdrop>
