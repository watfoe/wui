<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface ModalAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {
		divider?: boolean;
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
	import { Divider, Icon } from '$lib/display';
	import { Backdrop, Surface, type SurfaceAttributes } from '$lib/utils';

	let {
		class: _class = '',
		divider = false,
		id,
		title,
		showclose = true,
		p,
		px = 'md',
		py = 'sm',
		position = 'center',
		...rest
	}: ModalAttributes = $props();
	let backdrop: HTMLDialogElement;

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
	<Surface
		role="dialog"
		aria-modal="true"
		aria-label="Modal"
		color="white"
		variant="solid"
		direction="column"
		{p}
		{px}
		{py}
		class="WuiModal WuiModal--{position} {_class}"
		onclick={click}
		{...rest}
	>
		{#if showclose || title || $$slots.header}
			<Row justify="space-between" class="WuiModal__header" width="100%">
				{#if $$slots.header}
					<slot name="header" />
				{:else if title}
					<Text variant="heading" size="sm" tabindex={0}>{title}</Text>
				{/if}

				{#if showclose}
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
				{/if}
			</Row>
		{/if}

		{#if divider}
			<Divider />
		{/if}

		<Col class="WuiModal__body">
			<slot />
		</Col>
	</Surface>
</Backdrop>
