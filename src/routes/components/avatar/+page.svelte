<script lang="ts">
	import { Avatar } from '$lib/avatar';
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '../../../lib/playground/index.svelte';
	import { Text } from '$lib/text';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'solid',
		color: 'primary',
		size: 'md',
		shape: 'rounded',
		disabled: false,
		loading: false
	});
</script>

<Col items="start" gap="md" width="100%">
	<Text variant="title" size="sm">Avatar</Text>
	<Playground bind:values>
		<Row gap="lg">
			<Avatar
				color={values?.color}
				variant={values?.variant}
				size={values?.size}
				shape={values?.shape}
			>
				JL
			</Avatar>
			<Avatar
				color={values?.color}
				variant={values?.variant}
				size={values?.size}
				shape={values?.shape}
			/>
		</Row>
	</Playground>
</Col>
