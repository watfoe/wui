<script lang="ts">
	import { Checkbox } from '$lib/checkbox';
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
</script>

<Col gap="lg">
	<Row gap="lg" width="100%">
		<Checkbox label="Primary small radio" name="checkbox" size="sm" color="primary" />
		<Checkbox label="Neutral medium checkbox" name="checkbox" size="md" />
		<Checkbox label="Large success checkbox" name="checkbox" size="lg" color="success" />
		<Checkbox label="Warning checkbox" name="checkbox" color="warning" />
		<Checkbox label="Danger checkbox" name="checkbox" color="danger" />
	</Row>
</Col>
