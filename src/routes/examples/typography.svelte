<script>
	import Col from '$lib/col';
	import Row from '$lib/row';
	import Text from '$lib/text';
</script>

<Col gap="md" width="100%">
	<Row align="flex-end" gap="md" width="100%">
		<Text variant="title" size="lg">Large Title</Text>
		<Text variant="title" size="md">Medium Title</Text>
		<Text variant="title" size="sm" color="danger">Small Title</Text>
	</Row>

	<Row align="flex-end" gap="md" width="100%">
		<Text variant="heading" size="lg">Large heading</Text>
		<Text variant="heading" size="md">Medium heading</Text>
		<Text variant="heading" size="sm">Small heading</Text>
	</Row>

	<Row align="flex-end" gap="md" width="100%">
		<Text variant="body" size="lg">Large body</Text>
		<Text variant="body" size="md">Medium body</Text>
		<Text variant="body" size="sm" color="danger">Small body</Text>
	</Row>

	<Row align="flex-end" gap="md" width="100%">
		<Text variant="label" size="lg">Large label</Text>
		<Text variant="label" size="md">Medium label</Text>
		<Text variant="label" size="sm" color="danger">Small label</Text>
	</Row>
</Col>
