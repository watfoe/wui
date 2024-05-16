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
	import Col from '$lib/layout/col/index.svelte';
	import Backdrop from '$lib/utils/backdrop/index.svelte';
	import Button from '$lib/button/index.svelte';
	import Divider from '$lib/display/divider/index.svelte';
	import Icon from '$lib/display/icon/index.svelte';
	import Text from '$lib/typography/text/index.svelte';
	import Row from '$lib/layout/row/index.svelte';
	import Surface, { type SurfaceAttributes } from '$lib/utils/surface/index.svelte';

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
		aria-label="Modal"
		color="white"
		class="WuiModal WuiModal--{position} {_class}"
		direction="column"
		element="div"
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
			<Row justify="space-between" class="WuiModal__header" width="100%">
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
						class="WuiModal__close-button"
						onclick={close}
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

		<Col class="WuiModal__body">
			{#if children}
				{@render children()}
			{/if}
		</Col>
	</Surface>
</Backdrop>
