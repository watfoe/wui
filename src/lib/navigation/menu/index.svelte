<script context="module" lang="ts">
	import { Listbox, type ListboxAttributes } from '$lib/inputs';

	export interface MenuAttributes extends Omit<ListboxAttributes, 'align' | 'role' | 'aria-label'> {
		id: string;
		align?: 'left' | 'right' | 'center';
	}
</script>

<script lang="ts">
	import { Backdrop } from '$lib/feedback';

	let { _this, id, align = 'left', ...rest } = $props<MenuAttributes>();
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
			if (_this && !menuRect.width) {
				menuRect = _this.getBoundingClientRect();
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
		role="menu"
		aria-label="Menu"
		class={rest.class || ''}
		style="position: absolute; transform: translate3d({rect.left}px, {rect.top}px, 0); min-width: {rect.width}px"
		bind:_this
	>
		<slot />
	</Listbox>
</Backdrop>
