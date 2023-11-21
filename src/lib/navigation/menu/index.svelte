<script lang="ts">
  import './style.css';
  import { Backdrop } from '$lib/feedback';
  import { Col } from '$lib/layout';

  let rect = {
    top: 0,
    left: 0,
    width: 0,
  };

  function handleClick(e: CustomEvent) {
    e.stopImmediatePropagation();
  }

  function handleOpen(e: CustomEvent) {
    const { innerWidth } = window;
    const anchor = e.detail.anchor as HTMLElement;

    if (anchor) {
      let {top, left, width, height} = anchor.getBoundingClientRect();

      if (left + 260 > innerWidth) {
        left = left - 260 + width;
      }

      rect = {
        top: top + height + 2,
        left,
        width,
      };
    }
  }
</script>

<Backdrop id={$$restProps.id} on:open={handleOpen} transparent>
  <Col
    role="menu"
    aria-label="Menu"
    class="WuiMenu {$$restProps.class || ''}"
    style="--WuiMenu-posX:{rect.left}px;--WuiMenu-posY:{rect.top}px;--WuiMenu-minWidth:{rect.width}px"
    on:click={handleClick}
  >
    <slot />
  </Col>
</Backdrop>
