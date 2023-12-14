<script lang="ts">
  import './style.css';

  import { Backdrop } from '$lib/feedback';
  import { Col, Row } from '$lib/layout';
	import { Button } from '$lib/button';
  import { Text } from '$lib/typography';
	import { onMount } from 'svelte';

  interface $$Props {
    id: string;
    title?: string;
    showclose?: 'true' | 'false';
  }

  export let id: $$Props['id'];
  export let title: $$Props['title'] = undefined;
  export let showclose: $$Props['showclose'] = 'true';

  onMount(() => {
    if (!id) {
      throw new Error('An id prop must be added to the <Modal /> element')
    }
  });

  function click(e: CustomEvent) {
    e.stopPropagation();
  }
</script>

<Backdrop id={id}>
  <Col
    role="dialog"
    aria-modal="true"
    tabindex={-1}
    aria-label="Modal"
    class="WuiModal {$$restProps.class || ''}"
    on:click={click}
  >
    {#if showclose === 'true' || title || $$slots.header}
      <Row justify="space-between" gap="lg" class="WuiModal__header">
        {#if $$slots.header}
          <slot name="header" />
        {:else if title}
          <Text variant="title" size="sm">{title}</Text>
        {/if}
        {#if showclose === 'true'}
          <form>
            <Button variant="soft" color="neutral" size="sm" prefix="close" class="WuiModal__close-button" value="cancel" formmethod="dialog" />
          </form>
        {/if}
      </Row>
    {/if}

    <Col class="WuiModal__body">
      <slot />
    </Col>
  </Col>
</Backdrop>
