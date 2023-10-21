<script lang="ts">
  import { Row } from '$lib/layout';
	import { onMount } from 'svelte';
  import Tab from './tab.svelte';

  interface $$Props {
    for: string;
  }

  let _for: $$Props['for'];
  export { _for as for };

  let tabs: HTMLDivElement;

  onMount(() => {
    const tabpanels = document.getElementById(_for) as HTMLDivElement;
    const tabButtons = tabs.querySelectorAll('.cs-tab');

    tabButtons.forEach((tabButton) => {
      tabButton.addEventListener('click', () => {
        tabButtons.forEach((tabButton) => {
          tabButton.classList.remove('active');
        });
        tabButton.classList.add('active');
      });
    });
  });
</script>

<Row bind:this={tabs} justify="flex-start">
  <slot />
</Row>
