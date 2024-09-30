<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Progress } from '$lib/progress';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'primary',
		size: 'md',
		variant: 'soft'
	});
</script>

<svelte:head>
	<title>Wui Progress Component</title>
</svelte:head>

<Col align="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Progress</Text>
	<Playground bind:values>
		<Progress
			shape="circular"
			color={values?.color}
			size={values?.size}
			variant={values?.variant}
		/>
		<Progress shape="linear" color={values?.color} size={values?.size} variant={values?.variant} />
	</Playground>
</Col>
