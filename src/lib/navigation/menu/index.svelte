<script lang="ts">
	import { Backdrop } from '$lib/feedback';
	import { Listbox } from '$lib/inputs';
	import type { Snippet } from 'svelte';

	interface MenuAttributes {
		id: string;
		class?: string | null;
		align?: 'left' | 'right' | 'center';
		children: Snippet;
	}

	let { id, align = 'left', ...rest } = $props<MenuAttributes>();
	let menu: HTMLDivElement;

	let rect = $state({
		top: 0,
		left: 0,
		width: 0
	});

	let menuRect = {} as DOMRect;

	function open(e: CustomEvent) {
		const { innerWidth, innerHeight } = window;
		const anchor = e.detail.anchor as HTMLElement;

		if (anchor) {
			let { top, left, width, height } = anchor.getBoundingClientRect();

			// Preserve the first domrect of the menu, translate() will change the
			// position of the x and y properties and we need to use the original values.
			if (!menuRect.width) {
				menuRect = menu.getBoundingClientRect();
			}

			// We are using transform: translate() to position the menu which
			// takes in to account the menu's x and y position.
			left -= menuRect.x;
			top -= menuRect.y;

			if (menuRect.width > width) {
				if (left + menuRect.width > innerWidth) {
					left = left - menuRect.width + width;
				}
			}

			if (top + height + menuRect.height > innerHeight) {
				top = top - menuRect.height - height;
			} else {
				top += height + 2;
			}

			rect = {
				top,
				left,
				width
			};
		}
	}
</script>

<Backdrop {id} onopen={open} transparent>
	<Listbox
		bind:element={menu}
		role="menu"
		aria-label="Menu"
		class={rest.class || ''}
		style="position: absolute; transform: translate3d({rect.left}px, {rect.top}px, 0); min-width: {rect.width}px"
	>
		<slot />
	</Listbox>
</Backdrop>
