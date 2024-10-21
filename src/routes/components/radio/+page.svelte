<script lang="ts">
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Radio } from '$lib/radio';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		shape: 'circle',
		disabled: false
	});
</script>

<svelte:head>
	<title>Wui Radio component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="title" size="sm">Radio</Text>
	<Playground bind:values>
		<Radio
			color={values?.color}
			label="Label"
			variant={values?.variant}
			size={values?.size}
			shape={values?.shape}
			disabled={values?.disabled}
		/>
	</Playground>

	<Text variant="heading" mt={34} size="md">Label position</Text>
	<Playground>
		<Row items="start" gap={55}>
			<Radio label="Label" />

			<Radio direction="column" gap="xs" label="Label" />

			<Radio direction="column-reverse" gap="xs" label="Label" />

			<Radio direction="row-reverse" label="Label" />
		</Row>
	</Playground>
</Col>
