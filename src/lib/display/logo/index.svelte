<script lang="ts">
  interface $$Props {
    class?: string;
    size?: number;
    style?: string;
  }

  export let size: $$Props['size'] = 100;
</script>

<enhanced:img src="../../styles/images/logo-no-bg.png" class="logo {$$restProps.class || ''}" alt="Watfoe official logo" style="--size:{size}px;{$$restProps.style || ''}" />

<style>
  .logo {
    width: var(--size);
    height: auto;
  }
</style>