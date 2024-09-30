<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { Icon } from '$lib/icon';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'primary',
		size: 'md',
		label: 'home'
	});
</script>

<svelte:head>
	<title>Wui Icon Component</title>
</svelte:head>

<Col align="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Icon</Text>
	<Playground bind:values>
		<Icon color={values?.color} size={values?.size}>
			{values?.label}
		</Icon>
	</Playground>
</Col>
