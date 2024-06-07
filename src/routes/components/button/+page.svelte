<script>
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Row } from '$lib/row';
	import Playground from '../playground/index.svelte';
	import { Text } from '$lib/text';

	let values = $state({
		variant: 'solid',
		color: 'primary',
		size: 'md',
		shape: 'rounded',
		disabled: false,
		loading: false
	});
</script>

<Col align="flex-start" gap="md" width="100%">
	<Text variant="title" size="sm">Button</Text>
	<Playground bind:values>
		<Row gap="lg">
			<Button
				color={values.color}
				variant={values.variant}
				size={values.size}
				shape={values.shape}
				loading={values.loading}
				disabled={values.disabled}
			>
				Hello, World!
			</Button>

			<Button
				color={values.color}
				variant={values.variant}
				size={values.size}
				shape={values.shape}
				prefix="menu"
				loading={values.loading}
				disabled={values.disabled}
			/>
		</Row>
	</Playground>
</Col>
