<script context="module" lang="ts">
	import {
		display,
		type WuiColor,
		type WuiShape,
		type WuiSize,
		type WuiSpacing,
		type WuiVariant
	} from '$lib';
	import { untrack, setContext } from 'svelte';

	export interface TabsAttributes {
		bottomrule?: boolean;
		color?: WuiColor;
		for: string;
		gap?: WuiSpacing;
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
		for: _for,
		gap = 'md',
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
		size,
		shape,
		variant
	});

	$effect(() => {
		untrack(() => {
			const tabPanelsParent = document.querySelector(`#${_for}.WuiTabPanels`) as HTMLDivElement;
			const tabButtons = tabs.querySelectorAll('.WuiTab');

			if (!tabPanelsParent) {
				throw new Error(`No tabpanels found for ${_for}`);
			}

			const tabPanels = tabPanelsParent.children;

			function dispatchEvent(elem: Element) {
				elem.dispatchEvent(new Event('select'));
			}

			tabButtons.forEach((tabButton, index) => {
				const tabId = `${_for}-tab-${index}`;
				const tabPanelId = `${_for}-tabpanel-${index}`;

				tabButton.setAttribute('id', tabId);
				tabButton.setAttribute('aria-controls', tabPanelId);

				// Add aria role tab to each tabpanel
				tabPanels[index]?.setAttribute('role', 'tabpanel');
				tabPanels[index]?.setAttribute('id', tabPanelId);
				tabPanels[index]?.setAttribute('tabindex', '-1');
				tabPanels[index]?.setAttribute('aria-labelledby', tabId);

				if (index === activeIndex) {
					dispatchEvent(tabButton);

					if (tabPanels[index]) {
						tabPanels[index].setAttribute('tabindex', '0');
						dispatchEvent(tabPanels[index]);
					}
				}

				tabButton.addEventListener('click', () => {
					if (index === activeIndex) {
						return;
					}

					dispatchEvent(tabButtons[activeIndex]);

					if (tabPanels[activeIndex]) {
						tabPanels[activeIndex].setAttribute('tabindex', '-1');
						dispatchEvent(tabPanels[activeIndex]);
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
</script>

<div
	bind:this={tabs}
	role="tablist"
	class={bottomrule ? 'WuiTabs--bottom-ruled' : ''}
	style:display="flex"
	style:flex-direction="row"
	style:gap="var(--space-{gap})"
	style:width="100%"
>
	<slot />
</div>

<style>
	.WuiTabs--bottom-ruled {
		border-bottom: var(--line);
		margin-bottom: var(--WuiTab-marginBottom, var(--space-md));
	}
	.WuiTabs--bottom-ruled > :global(.WuiTab) {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
</style>
