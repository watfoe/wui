<script lang="ts">
	import { onMount } from 'svelte';

  interface $$Props {
    for: string;
  }

  let _for: $$Props['for'];
  export { _for as for };

  let tabs: HTMLDivElement;
  let activeIndex = 0;

  onMount(() => {
    const tabPanelsParent = document.getElementById(_for) as HTMLDivElement;
    const tabButtons = tabs.querySelectorAll('.cs-tab');

    if (!tabPanelsParent) {
      throw new Error(`No tabpanels found for ${_for}`);
    }

    const tabPanels = tabPanelsParent.children;

    function dispatchEvent(tabpanel: Element, active: boolean) {
      tabpanel.dispatchEvent(new CustomEvent('active', {
        detail: {
          active,
        },
      }));
    }

    tabButtons.forEach((tabButton, index) => {
      if (index === activeIndex) {
        tabButton.classList.add('active');
        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
          dispatchEvent(tabPanels[index], true);
        }
      }

      // Add aria role tab to each tabpanel
      tabPanels[index]?.setAttribute('role', 'tabpanel');

      tabButton.addEventListener('click', () => {
        tabButtons[activeIndex].classList.remove('active');

        if (tabPanels[activeIndex]) {
          tabPanels[activeIndex].classList.remove('active');
          dispatchEvent(tabPanels[activeIndex], false);
        }

        tabButton.classList.add('active');

        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
          dispatchEvent(tabPanels[index], true);
        }

        activeIndex = index;
      });
    });
  });
</script>

<div bind:this={tabs} justify="flex-start" class="cs-tabs">
  <slot />
</div>

<style>
  @import './style.css';
</style>
