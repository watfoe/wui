<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WuiFlexAlign } from '$lib/types';

	export interface SnackbarAttributes
		extends Omit<SurfaceAttributes<HTMLAttributes<HTMLDivElement>>, 'element'> {
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
	import { Surface, type SurfaceAttributes } from '$lib/utils';

	let {
		align = 'flex-start',
		class: _class = '',
		color = 'neutral',
		gap = 'md',
		id,
		p = 'md',
		position = 'bottom-right',
		prefix,
		shape = 'rounded',
		showclose = true,
		title,
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

<Surface
	{variant}
	{color}
	{id}
	{p}
	{gap}
	{align}
	role="alertdialog"
	aria-label="Snackbar"
	class="WuiSnackbar WuiSnackbar--{position} {_class}"
	onclick={click}
	{...rest}
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
</Surface>
