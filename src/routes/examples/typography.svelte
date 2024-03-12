<script>
	import { Col, Row } from '$lib/layout';
	import { Text } from '$lib/typography';
</script>

<Col gap="md" width="full">
	<Row align="flex-end" gap="md" width="full">
		<Text variant="title" size="lg">Large Title</Text>
		<Text variant="title" size="md">Medium Title</Text>
		<Text variant="title" size="sm" color="danger">Small Title</Text>
	</Row>

	<Row align="flex-end" gap="md" width="full">
		<Text variant="heading" size="lg">Large heading</Text>
		<Text variant="heading" size="md">Medium heading</Text>
		<Text variant="heading" size="sm">Small heading</Text>
	</Row>

	<Row align="flex-end" gap="md" width="full">
		<Text variant="body" size="lg">Large body</Text>
		<Text variant="body" size="md">Medium body</Text>
		<Text variant="body" size="sm" color="danger">Small body</Text>
	</Row>

	<Row align="flex-end" gap="md" width="full">
		<Text variant="label" size="lg">Large label</Text>
		<Text variant="label" size="md">Medium label</Text>
		<Text variant="label" size="sm" color="danger">Small label</Text>
	</Row>

	<Row align="flex-end" gap="md" width="full">
		<Text variant="code" size="lg">Large code</Text>
		<Text variant="code" size="md">Medium code</Text>
		<Text variant="code" size="sm" color="danger">Small code</Text>
	</Row>
</Col>
