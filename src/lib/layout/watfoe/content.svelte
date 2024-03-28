<script lang="ts">
	import { Col, type ColAttributes } from '..';
	const { class: _class = '', ...rest } = $props<ColAttributes>();
</script>

<Col width="full" class="WuiContent {_class}" {...rest}></Col>
