<script lang="ts">
  import './style.css';
	import { onMount } from 'svelte';

  interface $$Props {
    for: string;
  }

  let _for: $$Props['for'];
  export { _for as for };

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
      return elem.dispatchEvent(new CustomEvent('select', {
        detail: {
          active,
        },
      }));
    }

    tabButtons.forEach((tabButton, index) => {
      if (index === activeIndex) {
        dispatchEvent(tabButton, true);

        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
          dispatchEvent(tabPanels[index], true);
        }
      }

      // Add aria role tab to each tabpanel
      tabPanels[index]?.setAttribute('role', 'tabpanel');

      tabButton.addEventListener('click', () => {
        if (index === activeIndex) {
          return;
        }

        dispatchEvent(tabButtons[activeIndex], false);

        if (tabPanels[activeIndex]) {
          tabPanels[activeIndex].classList.remove('active');
          dispatchEvent(tabPanels[activeIndex], false);
        }

        dispatchEvent(tabButton, true);

        if (tabPanels[index]) {
          tabPanels[index].classList.add('active');
          dispatchEvent(tabPanels[index], true);
        }

        activeIndex = index;
      });
    });
  });
</script>

<div bind:this={tabs} class="WuiTabs">
  <slot />
</div>
