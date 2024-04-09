<script context="module" lang="ts">
	export interface PopupAttributes extends HTMLAttributes<HTMLDivElement> {
		_this?: HTMLDivElement;
		id: string;
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
	import Backdrop from '../backdrop/index.svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		_this = $bindable(),
		class: _class = '',
		id,
		position = 'bottom-start',
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
		const anchor = e.detail.anchor;

		if (anchor && _this) {
			const {
				left: anchor_left,
				top: anchor_top,
				width: anchor_width,
				height: anchor_height
			} = anchor.getBoundingClientRect();

			let left = anchor_left;
			let top = anchor_top;
			let { width, height } = _this.getBoundingClientRect();

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

					// If the top is still less than 0, position to the top
					if (top < 13) {
						top = 13;
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

					// If the top is greater than the innerHeight, position to the bottom
					if (top + height + spacing > innerHeight) {
						top = innerHeight - 13;
					}
				} else {
					// position to start-vertical
					top = anchor_top;
				}
			}

			rect = { left, top, width };
		}
	}
</script>

<Backdrop {id} onopen={open} transparent>
	<div
		role="tooltip"
		aria-label="Popup"
		{...rest}
		class="WuiPopup {_class}"
		style="left:{rect.left}px; top:{rect.top}px; min-width:{rect.width}px;"
		bind:this={_this}
	>
		<slot />
	</div>
</Backdrop>

<style>
	.WuiPopup {
		border: 1px solid var(--color-outline);
		overflow-y: auto;
		padding: var(--space-xs) 0;
		position: absolute;
	}
</style>
