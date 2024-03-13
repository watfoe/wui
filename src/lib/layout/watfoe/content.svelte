<script>
	import { Col } from '..';
	const { class: _class = '', ...rest } = $props();
</script>

<Col width="full" height="full" class="WuiContent {_class}" {...rest}></Col>
