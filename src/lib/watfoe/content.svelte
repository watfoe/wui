<script lang="ts">
	import Col, { type ColAttributes } from '../col';
	const { class: _class = '', ...rest }: ColAttributes = $props();
</script>

<Col class="WuiContent {_class}" width="100%" p="lg" mt={50} {...rest} />
