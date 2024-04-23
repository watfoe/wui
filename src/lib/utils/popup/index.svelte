<script context="module" lang="ts">
	import { Surface, type SurfaceAttributes } from '$lib/utils';

	export interface PopupAttributes
		extends Omit<SurfaceAttributes<Omit<HTMLAttributes<HTMLDivElement>, 'onclose'>>, 'element'>,
			BaseBackdropAttributes {
		id?: string;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-start'
			| 'top-end'
			| 'bottom-start'
			| 'bottom-end'
			| 'left-start'
			| 'left-end'
			| 'right-start'
			| 'right-end';
	}
</script>

<script lang="ts">
	import './style.css';
	import Backdrop, { type BaseBackdropAttributes } from '../backdrop/index.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: _class = '',
		color = 'neutral',
		id,
		onopen,
		onclose,
		opened = $bindable(false),
		py = 'ss',
		position = 'bottom-start',
		role = 'popup',
		shape = 'rounded',
		variant = 'outlined',
		...rest
	}: PopupAttributes = $props();

	const spacing = 2;

	let rect = $state({
		left: 0,
		top: 0,
		width: 0
	});

	function open(e: CustomEvent) {
		const { innerWidth, innerHeight } = window;
		const anchor = e.detail.anchor as HTMLButtonElement;
		const dialog = e.target as HTMLDialogElement;

		if (anchor) {
			const {
				left: anchor_left,
				top: anchor_top,
				width: anchor_width,
				height: anchor_height
			} = anchor.getBoundingClientRect();

			let left = anchor_left;
			let top = anchor_top;
			let { width, height } = dialog.firstElementChild?.getBoundingClientRect() || {
				width: 0,
				height: 0
			};

			// The menu should at least be as wide as the anchor
			if (width < anchor_width) {
				width = anchor_width;
			}

			// Positions bottom-start & top-start are the same as left
			if (position === 'bottom-end' || position === 'top-end') {
				left -= width - anchor_width;
			} else if (position === 'left' || position === 'left-start' || position === 'left-end') {
				left -= width + spacing;
			} else if (position === 'right' || position === 'right-start' || position === 'right-end') {
				left += anchor_width + spacing;
			} else if (position === 'top' || position === 'bottom') {
				left -= (width - anchor_width) / 2;
			}

			// Positions left-start & right-start are the same as top
			if (position === 'bottom' || position === 'bottom-start' || position === 'bottom-end') {
				top += anchor_height + spacing;
			} else if (position === 'top' || position === 'top-start' || position === 'top-end') {
				top -= height + spacing;
			} else if (position === 'left' || position === 'right') {
				top -= (height - anchor_height) / 2;
			} else if (position === 'left-end' || position === 'right-end') {
				top -= height - anchor_height;
			}

			// top-start, top, bottom, bottom-start right-start, right, right-end
			if (left + width > innerWidth) {
				if (position === 'right' || position === 'right-start' || position === 'right-end') {
					// flip to left
					left = anchor_left - width + spacing;
				} else {
					// position to end-horizontal
					left = anchor_left - width - anchor_width;
				}
			}
			// left-start, left, left-end, top-end, top, bottom-end, bottom
			else if (left < 0) {
				if (position === 'left' || position === 'left-start' || position === 'left-end') {
					// flip to right
					left = anchor_left + anchor_width + spacing;
				} else {
					// position to start-horizontal
					left = anchor_left;
				}
			}

			if (top + height > innerHeight) {
				if (position === 'bottom' || position === 'bottom-start' || position === 'bottom-end') {
					// flip to top
					top = anchor_top - height - spacing;

					// If the top is still less than 0, position to the center
					if (top < 13) {
						const d = innerHeight - height;
						top = d - d / 2;
					}
				} else {
					// position to end-vertical
					top = anchor_top - height - anchor_height;
				}
			}
			// top-start, top, top-end, right-end, right, left-end, left
			else if (top < 0) {
				if (position === 'top' || position === 'top-start' || position === 'top-end') {
					// flip to bottom
					top = anchor_top + anchor_height + spacing;

					// If the top is greater than the innerHeight, position to the center
					if (top + height + spacing > innerHeight) {
						const d = innerHeight - height;
						top = d - d / 2;
					}
				} else {
					// position to start-vertical
					top = anchor_top;
				}
			}

			rect = { left, top, width };
		}

		onopen?.(e);
	}
</script>

<Backdrop {id} onopen={open} {onclose} transparent bind:opened>
	<Surface
		aria-label="Popup"
		class="WuiPopup {_class}"
		style="left:{rect.left}px;top:{rect.top}px;min-width:{rect.width}px;"
		{color}
		{role}
		{py}
		{shape}
		{variant}
		{...rest}
	/>
</Backdrop>
