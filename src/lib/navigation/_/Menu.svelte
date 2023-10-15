<script lang="ts">
  import { Feedback } from '$lib/feedback';
  import { Col } from '$lib/layout';

  let position = {
    top: 0,
    left: 0,
    arrow: 0,
  };

  function handleClick(e: CustomEvent) {
    e.stopImmediatePropagation();
  }

  function handleOpen(e: CustomEvent) {
    const { innerWidth } = window;
    const anchor = e.detail.anchor as HTMLElement;
    let anchorRect = { width: 0, height: 0 } as DOMRect;

    if (anchor) {
      anchorRect = anchor.getBoundingClientRect();
    }

    let left = anchorRect.left;
    let top = anchorRect.top;
    let arrow = anchorRect.width / 2;

    // If the menu is too close to the right edge of the screen, move it to the left
    if (anchorRect.left + 260 > innerWidth) {
      left = anchorRect.left - 260 + anchorRect.width;
      arrow = 260 - arrow;
    }

    position = {
      top: top + anchorRect.height + 7,
      left,
      arrow,
    };
  }
</script>

<Feedback id={$$restProps.id} on:open={handleOpen} transparent>
  <Col
    class="cs-menu {$$restProps.class || ''}"
    style="--left:{position.left}px;--top:{position.top}px"
    on:click={handleClick}
  >
    <div class="cs-menu-arrow" style="--arrow:{position.arrow}px;" />
    <slot />
  </Col>
</Feedback>

<style lang="scss">
  .cs-menu {
    border: 1px solid var(--color-outline);
    min-width: 200px;
    min-height: 50px;
    width: 260px;
    padding: var(--space-nm);
    position: absolute;
    top: var(--top);
    left: var(--left);

    .cs-menu-arrow {
      position: absolute;
      top: -8px;
      left: var(--arrow);
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid var(--color-outline);

      &::after {
        content: '';
        position: absolute;
        top: 1.5px;
        left: -8px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid var(--color-surface);
      }
    }
  }
</style>