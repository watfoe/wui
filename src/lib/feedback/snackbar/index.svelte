<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SnackbarAttributes
		extends Omit<HTMLAttributes<HTMLDivElement>, 'color'>,
			WuiSurface {
		id: string;
		title?: string;
		showclose?: boolean;
		position?:
			| 'top'
			| 'center'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-right';
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col, Row } from '$lib/layout';
	import { Button } from '$lib/buttons';
	import { Icon } from '$lib/display';
	import { Sheet } from '$lib/surfaces';
	import type { WuiSurface } from '$lib';

	let { id, title, showclose = true, position = 'center', ...rest }: SnackbarAttributes = $props();
	let backdrop: HTMLDialogElement;

	$effect.pre(() => {
		if (!id) {
			throw new Error('An id prop must be added to the Snackbar component');
		}
	});

	function click(e: MouseEvent) {
		e.stopPropagation();
	}

	function close() {
		backdrop?.close();
	}
</script>

<Sheet
	{...rest}
	{id}
	variant="outlined"
	role="alertdialog"
	aria-label="Snackbar"
	class="WuiSnackbar WuiSnackbar--{position} {rest.class || ''}"
	onclick={click}
>
	{#if showclose}
		<Button
			variant="soft"
			color="danger"
			size="sm"
			shape="circle"
			class="WuiSnackbar__close-button"
			onclick={close}
		>
			<Icon slot="prefix" size="md">close</Icon>
		</Button>
	{/if}

	<Col class="WuiSnackbar__body">
		<slot />
	</Col>
</Sheet>
