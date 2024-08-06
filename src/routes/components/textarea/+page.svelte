<script lang="ts">
	import { Col } from '$lib/col';
	import { Input } from '$lib/input';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { TextArea } from '$lib/textarea';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'primary',
		variant: 'outlined',
		size: 'md',
		shape: 'rounded',
		disabled: false,
		label: 'Label'
	});
</script>

<svelte:head>
	<title>Wui Textarea Component</title>
</svelte:head>

<Col align="flex-start" gap="md" width="100%">
	<Text variant="heading" size="lg">TextArea</Text>
	<Playground bind:values>
		<TextArea
			color={values?.color}
			variant={values?.variant}
			size={values?.size}
			shape={values?.shape}
			disabled={values?.disabled}
			label={values?.label}
			placeholder="Placeholder"
			width={300}
		/>
	</Playground>
</Col>
