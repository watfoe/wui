<script>
	import { Row } from '$lib/row';
	import { TabPanel } from '$lib/tabs';
	import { Text } from '$lib/text';
</script>

<TabPanel items="start" gap="md">
	<Row items="end" gap="md" width="100%">
		<Text variant="title" size="lg">Large Title</Text>
		<Text variant="title" size="md">Medium Title</Text>
		<Text variant="title" size="sm" color="error">Small Title</Text>
	</Row>

	<Row items="end" gap="md" width="100%">
		<Text variant="heading" size="lg">Large heading</Text>
		<Text variant="heading" size="md">Medium heading</Text>
		<Text variant="heading" size="sm">Small heading</Text>
	</Row>

	<Row items="end" gap="md" width="100%">
		<Text variant="body" size="lg">Large body</Text>
		<Text variant="body" size="md">Medium body</Text>
		<Text variant="body" size="sm" color="error">Small body</Text>
	</Row>

	<Row items="end" gap="md" width="100%">
		<Text variant="label" size="lg">Large label</Text>
		<Text variant="label" size="md">Medium label</Text>
		<Text variant="label" size="sm" color="error">Small label</Text>
	</Row>

	<Row width={500}>
		Rewind.ai - as someone who has horrific memory, it's intriguing to record everything in a
		searchable format. A true second brain..
	</Row>
</TabPanel>
