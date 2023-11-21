<script lang="ts">
  interface $$Props {
    content?: string | number;
    position?: 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | string;
    max?: number;
  }

  export let content: $$Props['content'] = undefined;
  export let position: $$Props['position'] = 'top-right';
  export let color: $$Props['color'] = 'primary';
  export let max: $$Props['max'] = undefined;

  let badge: HTMLDivElement;
</script>

<div
  aria-label="badge"
  bind:this={badge}
  class="WuiBadge WuiBadge-{position} {!$$slots.content && !content ? 'WuiBadge-no-content' : ''}">
  <slot />

  <div class="WuiBadge-content WuiBg-{color}">
    {#if $$slots.content}
      <slot name="content" />
    {:else if content}
      <span class="Wui-badge-content">
        {
          typeof !isNaN(Number(content)) && max
            ? Number(content) > max
              ? `${max}+`
              : content
            : content
        }
      </span>
    {/if}
  </div>
</div>

<style>
  .WuiBadge {
    display: inline-flex !important;
    position: relative !important;
    --WuiBadge-height: 1rem;
    --WuiBadge-paddingX: var(--space-xs);
    --WuiBadge-radius: 1rem;
    --WuiBadge-translateX: 50%;
    --WuiBadge-translateY: -50%;
  }

  .WuiBadge-no-content {
    --WuiBadge-height: 0.75rem;
    --WuiBadge-paddingX: 0;
    --WuiBadge-radius: 0.75rem;
  }

  .WuiBadge-content {
    align-items: center;
    border-radius: var(--WuiBadge-radius);
    box-sizing: border-box;
    box-shadow: 0 0 0 2px;
    display: inline-flex;
    flex-wrap: wrap;
    font-size: 0.75rem;
    -webkit-box-pack: center;
    place-content: center;
    -webkit-box-align: center;
    position: absolute;
    padding: 0 var(--WuiBadge-paddingX);
    min-height: var(--WuiBadge-height);
    line-height: 1.2;
    min-width: var(--WuiBadge-height);
    -webkit-transform: scale(1) translateX(var(--WuiBadge-translateX)) translateY(var(--WuiBadge-translateY));
    -moz-transform: scale(1) translateX(var(--WuiBadge-translateX)) translateY(var(--WuiBadge-translateY));
    -ms-transform: scale(1) translateX(var(--WuiBadge-translateX)) translateY(var(--WuiBadge-translateY));
    transform: scale(1) translateX(var(--WuiBadge-translateX)) translateY(var(--WuiBadge-translateY));
    transform-origin: 100% 0%;
    z-index: 10000;
  }

  .WuiBadge-top-left .WuiBadge-content {
    top: 0;
    left: 0;
    --WuiBadge-translateX: -50%;
    --WuiBadge-translateY: -50%;
  }
  .WuiBadge-top-right .WuiBadge-content {
    top: 0;
    right: 0;
    --WuiBadge-translateX: 50%;
    --WuiBadge-translateY: -50%;
  }
  .WuiBadge-bottom-left .WuiBadge-content {
    bottom: 0;
    left: 0;
    --WuiBadge-translateX: -50%;
    --WuiBadge-translateY: 50%;
  }
  .WuiBadge-bottom-right .WuiBadge-content {
    bottom: 0;
    right: 0;
    --WuiBadge-translateX: 50%;
    --WuiBadge-translateY: 50%;
  }
</style>
