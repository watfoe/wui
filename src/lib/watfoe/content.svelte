<script lang="ts">
	import Col, { type ColAttributes } from '../col';
	const { class: _class = '', ...rest }: ColAttributes = $props();
</script>

<Col class="watfoe-content {_class}" width="100%" p="lg" mt={50} {...rest} />

<style>
	:global(.watfoe-content) {
		min-height: calc(100vh - 50px);
		overflow-y: auto;
	}
</style>
