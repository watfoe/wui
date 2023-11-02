<script lang="ts">
  import './style.css';
  import { Feedback } from '$lib/feedback';
  import { Col } from '$lib/layout';

  let position = {
    top: 0,
    left: 0,
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

    // If the menu is too close to the right edge of the screen, move it to the left
    if (anchorRect.left + 260 > innerWidth) {
      left = anchorRect.left - 260 + anchorRect.width;
    }

    position = {
      top: top + anchorRect.height + 2,
      left,
    };
  }
</script>

<Feedback id={$$restProps.id} on:open={handleOpen} transparent>
  <Col
    class="WuiMenu {$$restProps.class || ''}"
    style="--WuiMenu-posX:{position.left}px;--WuiMenu-posY:{position.top}px"
    on:click={handleClick}
  >
    <slot />
  </Col>
</Feedback>
