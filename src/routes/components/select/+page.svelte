<script lang="ts">
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Select } from '$lib/select';
	import Option from '$lib/select/option.svelte';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		shape: 'rounded',
		disabled: false,
		loading: false
	});
</script>

<Col align="flex-start" gap="md" width="100%">
	<Text variant="title" size="sm">Select</Text>
	<Playground bind:values>
		<Select
			color={values.color}
			label="Select a color"
			variant={values.variant}
			size={values.size}
			shape={values.shape}
			disabled={values.disabled}
		>
			<Option value="primary">Primary</Option>
			<Option value="secondary">Secondary</Option>
			<Option value="success">Success</Option>
			<Option value="warning">Warning</Option>
			<Option value="danger">Danger</Option>
		</Select>
	</Playground>
</Col>

<Col gap="lg">
	<Select preset="country" selected="KE" style="width: 300px" variant="solid" shape="sharp" />
	<Select preset="gender" style="width: 300px" />
	<Select preset="month" style="width: 300px" />
</Col>
