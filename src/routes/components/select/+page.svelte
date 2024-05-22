<script lang="ts">
	import { Col } from '$lib/col';
	import { Select } from '$lib/select';
</script>

<Col gap="lg">
	<Select preset="country" selected="KE" style="width: 300px" variant="solid" shape="square" />
	<Select preset="gender" style="width: 300px" />
	<Select preset="month" style="width: 300px" />
</Col>
