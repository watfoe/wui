<script context="module" lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	export interface ModalAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {
		divider?: boolean;
		header?: Snippet;
		id: string;
		title?: string;
		showclose?: boolean;
		position?: 'top' | 'center' | 'bottom';
	}
</script>

<script lang="ts">
	import './style.css';
	import { Col } from '../col';
	import { Backdrop } from '../backdrop';
	import { Button } from '../button';
	import { Divider } from '../divider';
	import { Icon } from '../icon';
	import { Text } from '../text';
	import { Row } from '../row';
	import { Surface, type SurfaceAttributes } from '../surface';

	let {
		children,
		class: _class = '',
		divider = false,
		header,
		id,
		title,
		showclose = true,
		shape = 'rounded',
		p,
		px = 'md',
		py = 'sm',
		position = 'center',
		...rest
	}: ModalAttributes = $props();
	let backdrop: HTMLDialogElement | undefined = $state();

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

<Backdrop {id} bind:backdrop>
	<Surface
		aria-modal="true"
		aria-label="modal"
		color="white"
		class="w-modal w-modal--{position} {_class}"
		direction="column"
		element="div"
		justify="flex-start"
		role="dialog"
		variant="solid"
		onclick={click}
		{p}
		{px}
		{py}
		{shape}
		{...rest}
	>
		{#if showclose || title || header}
			<Row justify="space-between" width="100%">
				{#if header}
					{@render header()}
				{:else if title}
					<Text variant="heading" size="sm" tabindex={0}>{title}</Text>
				{/if}

				{#if showclose}
					<Button
						variant="plain"
						color="neutral"
						size="sm"
						shape="circle"
						onclick={close}
						ml="auto"
					>
						{#snippet prefix()}
							<Icon size="md">close</Icon>
						{/snippet}
					</Button>
				{/if}
			</Row>
		{/if}

		{#if divider}
			<Divider />
		{/if}

		<Col width="100%" style="overflow-y:auto">
			{#if children}
				{@render children()}
			{/if}
		</Col>
	</Surface>
</Backdrop>
