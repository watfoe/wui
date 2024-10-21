<script lang="ts">
	import { Col } from '$lib/col';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';
	import { List } from '$lib/list';
	import { ListItem } from '$lib/listitem';
	import { ListButtonItem } from '$lib/listbuttonitem';
	import { Divider } from '$lib/divider';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'plain',
		color: 'primary',
		size: 'md',
		shape: 'rounded'
	});
</script>

<svelte:head>
	<title>Wui Listbox Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="heading" size="lg">List</Text>
	<Playground bind:values>
		<List
			variant={values?.variant}
			color={values?.color}
			shape={values?.shape}
			itemsize={values?.size}
			p={5}
			gap="xs"
		>
			<ListItem>Item 1: some grocery stuff</ListItem>
			<ListItem>Item 2</ListItem>
			<ListItem>Item 3</ListItem>
			<ListItem>Item 4</ListItem>
			<ListItem>Item 5</ListItem>
		</List>
	</Playground>

	<Playground bind:values>
		<List
			variant="outlined"
			p="sm"
			color="error"
			gap="md"
			shape="rounded"
			itemvariant="solid"
			itemcolor="error"
			itemshape="pill"
			itemsize="sm"
		>
			<ListButtonItem suffix="clear">Item 1: some grocery stuff</ListButtonItem>
			<ListButtonItem prefix="check">Item 2</ListButtonItem>
			<ListButtonItem color="black">Item 3</ListButtonItem>
			<ListButtonItem color="primary">Item 4</ListButtonItem>
			<Divider color="error" />
			<List
				direction="row"
				variant="soft"
				p="xs"
				color="black"
				gap="sm"
				shape="rounded"
				itemshape="rounded"
				itemsize="sm"
			>
				<ListButtonItem prefix="home" selected></ListButtonItem>
				<ListButtonItem prefix="search"></ListButtonItem>
				<ListButtonItem prefix="person"></ListButtonItem>
				<Divider vertical />
				<ListButtonItem prefix="settings"></ListButtonItem>
				<ListButtonItem prefix="delete"></ListButtonItem>
			</List>
		</List>
	</Playground>
</Col>
