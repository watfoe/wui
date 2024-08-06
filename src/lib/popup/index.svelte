<script context="module" lang="ts">
	export type PopupAttributes<E extends keyof svelteHTML.IntrinsicElements> = SurfaceAttributes<E> &
		Omit<BaseBackdropAttributes, 'closeon'> & {
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
			closeon?: 'mouseout' | 'click-mouseout' | 'click-in' | 'click-in-out' | 'click-out' | 'none';
		};
</script>

<script lang="ts" generics="E extends keyof svelteHTML.IntrinsicElements = 'div'">
	import { Backdrop, type BaseBackdropAttributes } from '../backdrop';
	import { Surface, type SurfaceAttributes } from '../surface';

	let {
		backdrop = $bindable(),
		class: _class = '',
		closeon = 'click-in-out',
		color = 'neutral',
		colorweight,
		direction = 'column',
		textcolor = 'black',
		element,
		id,
		onopen,
		onclose,
		opened = $bindable(false),
		p = 3,
		position = 'bottom-start',
		role = 'popup',
		shape = 'rounded',
		style = '',
		variant = 'outlined',
		...rest
	}: PopupAttributes<E> = $props();

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
					left = anchor_left - width - spacing;
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
					top = anchor_top - height + anchor_height;
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

	function close_on_mouseout() {
		backdrop?.close();
		opened = false;
	}

	function close_on_click() {
		backdrop?.close();
		opened = false;
	}

	function dont_close(e: MouseEvent) {
		e.stopPropagation();
	}
</script>

<Backdrop
	{id}
	closeon={closeon === 'click-mouseout' || closeon === 'click-in-out' || closeon === 'click-out'
		? 'click'
		: 'none'}
	onopen={open}
	{onclose}
	transparent
	bind:backdrop
	bind:opened
>
	<Surface
		element={element || 'div'}
		class="w-popup {_class}"
		style="left:{rect.left}px;top:{rect.top}px;min-width:{rect.width}px;{style}"
		colorweight={!colorweight && variant === 'outlined' && color === 'neutral' ? '2' : colorweight}
		onclick={closeon === 'mouseout' || closeon === 'click-out'
			? dont_close
			: closeon === 'click-in'
				? close_on_click
				: undefined}
		onmouseout={closeon === 'mouseout' || closeon === 'click-mouseout'
			? close_on_mouseout
			: undefined}
		{color}
		{direction}
		{role}
		{p}
		{shape}
		{variant}
		{...rest}
	/>
</Backdrop>

<style>
	:global(.w-popup) {
		max-height: calc(100vh - calc(var(--space-xs) * 2));
		overflow-y: auto;
		position: absolute;
	}

	:global(.w-popup.w-outlined) {
		background-color: var(--color-surface);
	}
</style>
