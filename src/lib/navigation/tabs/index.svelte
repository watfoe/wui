<script context="module" lang="ts">
	import { onMount, type Snippet } from 'svelte';

	export interface TabsAttributes {
		for: string;
		bottomrule?: boolean;
    children: Snippet;
	}
</script>

<script lang="ts">
	let { for: _for, bottomrule = true, children } = $props<TabsAttributes>();
	let tabs: HTMLDivElement;
	let activeIndex = 0;

	onMount(() => {
		const tabPanelsParent = document.querySelector(`#${_for}.WuiTabPanels`) as HTMLDivElement;
		const tabButtons = tabs.querySelectorAll('.WuiTab');

		if (!tabPanelsParent) {
			throw new Error(`No tabpanels found for ${_for}`);
		}

		const tabPanels = tabPanelsParent.children;

		function dispatchEvent(elem: Element, active: boolean) {
			elem.dispatchEvent(
				new CustomEvent('select', {
					detail: {
						active
					}
				})
			);
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
				dispatchEvent(tabButton, true);

				if (tabPanels[index]) {
					tabPanels[index].setAttribute('tabindex', '0');
					dispatchEvent(tabPanels[index], true);
				}
			}

			tabButton.addEventListener('click', () => {
				if (index === activeIndex) {
					return;
				}

				dispatchEvent(tabButtons[activeIndex], false);

				if (tabPanels[activeIndex]) {
					tabPanels[activeIndex].setAttribute('tabindex', '-1');
					dispatchEvent(tabPanels[activeIndex], false);
				}

				dispatchEvent(tabButton, true);

				if (tabPanels[index]) {
					tabPanels[index].setAttribute('tabindex', '0');
					dispatchEvent(tabPanels[index], true);
				}

				activeIndex = index;
			});
		});
	});
</script>

<div bind:this={tabs} role="tablist" class="WuiTabs {bottomrule ? 'WuiTabs--bottom-ruled' : ''}">
	{@render children()}
</div>

<style>
	.WuiTabs {
		display: flex;
		flex-direction: row;
		gap: var(--space-md);
		width: 100%;
	}
	.WuiTabs--bottom-ruled {
		border-bottom: var(--line);
		margin-bottom: var(--WuiTab-marginBottom, var(--space-md));
	}
	.WuiTabs--bottom-ruled > :global(.WuiTab) {
		border-bottom-left-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
	}
</style>
