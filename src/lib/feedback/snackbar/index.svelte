<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface SnackbarAttributes extends SheetAttributes {
		align?: WuiFlexAlign;
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
		prefix?: string;
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col } from '$lib/layout';
	import { Button } from '$lib/buttons';
	import { Icon } from '$lib/display';
	import { Sheet, type SheetAttributes } from '$lib/surfaces';
	import type { WuiFlexAlign } from '$lib';

	let {
		align = 'flex-start',
		color = 'neutral',
		id,
		title,
		showclose = true,
		pad = 'md',
		position = 'bottom-right',
		prefix,
		variant = 'outlined',
		...rest
	}: SnackbarAttributes = $props();
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
	{color}
	{id}
	{pad}
	{variant}
	role="alertdialog"
	aria-label="Snackbar"
	class="WuiSnackbar WuiSnackbar--{position} WuiGap-md {rest.class || ''}"
	style="align-items: {align};"
	onclick={click}
>
	{#if $$slots.prefix}
		<slot name="prefix" />
	{:else if prefix}
		<Icon size="md">{prefix}</Icon>
	{/if}

	<Col
		align="flex-start"
		justify="flex-start"
		gap="md"
		class="WuiSnackbar__body WuiText WuiText--body WuiText--md WuiText--inherit"
	>
		<slot />
	</Col>

	{#if showclose}
		<Button
			variant={variant === 'outlined' ? 'plain' : variant}
			{color}
			size="sm"
			shape="circle"
			class="WuiSnackbar__close-button"
			onclick={close}
		>
			<Icon slot="prefix" size="md">close</Icon>
		</Button>
	{/if}
</Sheet>
