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
  @import './style.css';
</style>
