<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../../../lib/playground/index.svelte';
	import { Text } from '$lib/text';
	import { Chip } from '$lib/chip';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'soft',
		color: 'primary',
		size: 'md',
		shape: 'pill'
	});
</script>

<svelte:head>
	<title>Wui Chip Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Chip</Text>
	<Playground bind:values>
		<Chip color={values?.color} shape={values?.shape} size={values?.size} variant={values?.variant}>
			Chip
		</Chip>
		<Chip
			color={values?.color}
			shape={values?.shape}
			size={values?.size}
			variant={values?.variant}
			prefix="format_align_left"
		>
			Chip with prefix
		</Chip>
		<Chip
			color={values?.color}
			shape={values?.shape}
			size={values?.size}
			variant={values?.variant}
			suffix="format_align_right"
		>
			Chip with suffix
		</Chip>
	</Playground>
</Col>
