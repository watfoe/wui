<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WuiSpacing } from '$lib/types';

	export interface ModalAttributes extends HTMLAttributes<HTMLDivElement> {
		id: string;
		title?: string;
		showclose?: boolean;
		pad?: WuiSpacing;
		padx?: WuiSpacing;
		pady?: WuiSpacing;
		position?: 'top' | 'center' | 'bottom';
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col, Row } from '$lib/layout';
	import { Button } from '$lib/buttons';
	import { Text } from '$lib/typography';
	import { Icon } from '$lib/display';
	import { Backdrop } from '$lib/utils';

	let {
		id,
		title,
		showclose = true,
		pad,
		padx = 'md',
		pady = 'sm',
		position = 'center',
		...rest
	}: ModalAttributes = $props();
	let backdrop: HTMLDialogElement;

	padx = padx || pad;
	pady = pady || pad;

	$effect.pre(() => {
		if (!id) {
			throw new Error('An id prop must be added to the Modal component');
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
		class="WuiModal WuiModal--{position} WuiPadding-x-{padx} WuiPadding-y-{pady} {rest.class || ''}"
		onclick={click}
	>
		{#if showclose || title || $$slots.header}
			<Row justify="space-between" gap="lg" class="WuiModal__header">
				{#if $$slots.header}
					<slot name="header" />
				{:else if title}
					<Text variant="heading" size="sm" tabindex={0}>{title}</Text>
				{/if}

				<Button
					variant="plain"
					color="neutral"
					size="sm"
					shape="circle"
					class="WuiModal__close-button"
					onclick={close}
				>
					<Icon slot="prefix" size="md">close</Icon>
				</Button>
			</Row>
		{/if}

		<Col class="WuiModal__body">
			<slot />
		</Col>
	</Col>
</Backdrop>
