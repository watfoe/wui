<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Tooltip } from '$lib/tooltip';
	import { Button } from '$lib/button';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'primary',
		size: 'md',
		label: 'This is a tooltip'
	});
</script>

<svelte:head>
	<title>Wui Tooltip Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Tooltip</Text>
	<Playground bind:values>
		<Tooltip color={values?.color} size={values?.size} title={values?.label!}>
			<Button>Hover to show tooltip</Button>
		</Tooltip>
	</Playground>
</Col>
