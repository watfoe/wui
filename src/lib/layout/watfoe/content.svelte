<script lang="ts">
	import { Col, type ColAttributes } from '..';
	const { class: _class = '', ...rest }: ColAttributes = $props();
</script>

<Col class="WuiContent {_class}" width="100%" p="lg" mt={50} {...rest}></Col>
