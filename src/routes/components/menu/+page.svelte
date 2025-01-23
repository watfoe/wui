<script lang="ts">
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Divider } from '$lib/divider';
	import { Menu, MenuItem } from '$lib/menu';
	import { Text } from '$lib/text';
	import Playground, { type PlaygroundAttributes } from '../../../lib/playground/index.svelte';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'neutral',
		size: 'md',
		shape: 'rounded',
		variant: 'outlined',
		position: 'left-start'
	});
</script>

<svelte:head>
	<title>Wui Menu Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Menu</Text>
	<Playground bind:values>
		<Button anchorfor="{values?.position}-menu">Show Menu</Button>

		<Menu
			id="{values?.position}-menu"
			color={values?.color}
			shape={values?.shape}
			variant={values?.variant}
			position={values?.position}
		>
			<MenuItem prefix="home">Home</MenuItem>
			<MenuItem prefix="apps" selected>Dashboard</MenuItem>
			<MenuItem prefix="settings">Settings</MenuItem>
			<Divider colorweight="2" />
			<MenuItem prefix="logout" color="error">Logout</MenuItem>
		</Menu>
	</Playground>
</Col>
