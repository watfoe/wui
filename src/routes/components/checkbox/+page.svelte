<script lang="ts">
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '../../../lib/playground/index.svelte';
	import { Text } from '$lib/text';
	import { Checkbox } from '$lib/checkbox';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		shape: 'rounded',
		disabled: false
	});
</script>

<svelte:head>
	<title>Wui Checkbox Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="title" size="sm">Checkbox</Text>
	<Playground bind:values>
		<Checkbox
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
			<Checkbox label="Label" />

			<Checkbox direction="column" gap="xs" label="Label" />

			<Checkbox direction="column-reverse" gap="xs" label="Label" />

			<Checkbox direction="row-reverse" label="Label" />
		</Row>
	</Playground>
</Col>
