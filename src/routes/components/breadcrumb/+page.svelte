<script lang="ts">
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'solid',
		color: 'primary',
		size: 'md',
		shape: 'rounded',
		disabled: false,
		loading: false,
		label: 'Hello, world!'
	});
</script>

<svelte:head>
	<title>Wui Button Component</title>
</svelte:head>

<Col align="flex-start" gap="md" width="100%">
	<Text variant="heading" size="lg">Button</Text>
	<Playground bind:values>
		<Row gap="lg">
			<Button
				color={values?.color}
				variant={values?.variant}
				size={values?.size}
				shape={values?.shape}
				loading={values?.loading}
				disabled={values?.disabled}
			>
				{values?.label}
			</Button>

			<Button
				color={values?.color}
				variant={values?.variant}
				size={values?.size}
				shape={values?.shape}
				prefix="menu"
				loading={values?.loading}
				disabled={values?.disabled}
			/>
		</Row>
	</Playground>
</Col>
