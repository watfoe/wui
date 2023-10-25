<script lang="ts">
  interface $$Props {
    id: string;
    class?: string;
    style?: string;
  }
  let _class: $$Props['class'] = '';
  export let id: $$Props['id'];
  export let style: $$Props['style'] = '';
  export { _class as class };
</script>

<div id={id} class="cs-tab-panels {_class}" style="{style}">
  <slot />
</div>