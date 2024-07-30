<script context="module" lang="ts">
	import {
		type WuiColor,
		type WuiShape,
		type WuiSize,
		type WuiSpacing,
		type WuiVariant
	} from '$lib/types';
	import { setContext, untrack, type Snippet } from 'svelte';
	import type { ButtonAttributes } from '$lib/button';

	export interface TabsAttributes {
		bottomrule?: boolean;
		color?: WuiColor;
		children: Snippet;
		for: string;
		gap?: WuiSpacing;
		navigation?: ButtonAttributes['navigation'];
		size?: WuiSize;
		shape?: Omit<WuiShape, 'circle' | 'pill'>;
		selected?: number;
		variant?: WuiVariant;
	}
</script>

<script lang="ts">
	let {
		bottomrule = true,
		color,
		children,
		for: _for,
		navigation,
		gap = 'sm',
		selected,
		size,
		shape,
		variant
	}: TabsAttributes = $props();
	let tabs: HTMLDivElement;
	let activeIndex = selected || 0;

	// To be use by Tab items
	setContext('wui-tab-ctx', {
		color,
		navigation,
		size,
		shape,
		variant
	});

	$effect(() => {
		untrack(() => {
			const tabPanels = document.querySelectorAll(`[data-tabpanels-id=${_for}]`);
			const tabButtons = tabs.querySelectorAll('.w-tab');

			if (tabPanels.length === 0) {
				throw new Error(`No tabpanels found with the id: '${_for}'`);
			}

			// const tabPanels = tabPanelsParent.children;

			tabButtons.forEach((tabButton, index) => {
				const tabId = `${_for}-tab-${index}`;
				const tabPanelId = `${_for}-${index}`;

				tabButton.setAttribute('id', tabId);
				tabButton.setAttribute('aria-controls', tabPanelId);

				// Add aria role tab to each tabpanel
				tabPanels[index]?.setAttribute('role', 'tabpanel');
				tabPanels[index]?.setAttribute('id', tabPanelId);
				tabPanels[index]?.setAttribute('tabindex', '-1');
				tabPanels[index]?.setAttribute('aria-labelledby', tabId);

				if (index === activeIndex) {
					// Since this $effect runs before the tabButtons are rendered/events are attached to them?
					// We need to wait for the tabButtons to be rendered before we can dispatch the select event
					// using setTimeout
					setTimeout(() => {
						dispatchEvent(tabButton);

						if (tabPanels[index]) {
							tabPanels[index].setAttribute('tabindex', '0');
							dispatchEvent(tabPanels[index]);
						}
					}, 0);
				}

				tabButton.addEventListener('click', () => {
					if (index === activeIndex) {
						return;
					}

					dispatchEvent(tabButtons[activeIndex]);

					if (tabPanels[activeIndex]) {
						tabPanels[activeIndex].setAttribute('tabindex', '-1');
					}

					dispatchEvent(tabButton);

					if (tabPanels[index]) {
						tabPanels[index].setAttribute('tabindex', '0');
						dispatchEvent(tabPanels[index]);
					}

					activeIndex = index;
				});
			});
		});
	});

	function dispatchEvent(tab: Element) {
		tab.dispatchEvent(new Event('select'));
	}
</script>

<div
	bind:this={tabs}
	role="tablist"
	class={bottomrule ? 'w-tabs--bottom-ruled' : ''}
	style:display="flex"
	style:flex-direction="row"
	style:gap="var(--space-{gap})"
>
	{@render children()}
</div>

<style>
	.w-tabs--bottom-ruled {
		border-bottom: var(--line);
		margin-bottom: var(--space-md);
	}
	.w-tabs--bottom-ruled > :global(.w-tab) {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
</style>
