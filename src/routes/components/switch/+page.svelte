<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Switch } from '$lib/switch';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'outlined',
		color: 'primary',
		size: 'md',
		shape: 'pill',
		disabled: false
	});
</script>

<svelte:head>
	<title>Wui Switch Component</title>
</svelte:head>

<Col align="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Switch</Text>
	<Playground bind:values>
		<Switch
			color={values?.color}
			variant={values?.variant}
			size={values?.size}
			shape={values?.shape}
		/>
	</Playground>
</Col>
