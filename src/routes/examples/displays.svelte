<script>
	import { Snackbar } from '$lib';
	import { Button } from '$lib/buttons';
	import {
		Badge,
		Divider,
		Icon,
		List,
		ListButtonItem,
		ListItem,
		Logo,
		Tooltip
	} from '$lib/display';
	import { Col, Row } from '$lib/layout';

	let openned = $state(false);

	setTimeout(() => {
		openned = true;
	}, 2000);
</script>

<Col gap="lg" width="100%">
	<Row gap="lg" width="100%">
		<Badge position="top-left">
			<Icon>mail</Icon>
		</Badge>
		<Badge position="top-right" color="neutral">
			<Icon>mail</Icon>
		</Badge>
		<Badge position="bottom-right" color="warning">
			<Icon>mail</Icon>
		</Badge>
		<Badge position="bottom-left" color="danger">
			<Icon>mail</Icon>
		</Badge>

		<Badge content="JL" color="neutral">
			<Icon>person</Icon>
		</Badge>

		<Badge content="200" color="success" position="bottom-left">
			<Icon>mail</Icon>
		</Badge>

		<Badge color="warning" position="bottom-right">
			{#snippet content()}
				<Icon size="sm">settings</Icon>
			{/snippet}
			<Icon>mail</Icon>
		</Badge>

		<Badge color="warning">
			{#snippet content()}
				<Icon size="sm">settings</Icon>
			{/snippet}
			<Icon>mail</Icon>
		</Badge>

		<Badge content="200" max={99} color="danger">
			<Icon>mail</Icon>
		</Badge>
	</Row>

	<Row gap="lg" width="100%">
		<Tooltip title="Please click me" position="top">
			<Button class="button">Continue</Button>
		</Tooltip>

		<Tooltip title="This a menu" position="bottom">
			<Icon>person</Icon>
		</Tooltip>

		<Tooltip title="mail settings">
			<Badge color="warning">
				{#snippet content()}
					<Icon size="sm">settings</Icon>
				{/snippet}
				<Icon>mail</Icon>
			</Badge>
		</Tooltip>
	</Row>

	<Row gap="lg" width="100%">
		<Logo size={200} />
		<Logo size={100} />
		<Logo size={60} />
	</Row>

	<Row gap="lg" width="100%">
		<Logo brand="google" />
		<Logo brand="apple" />
		<Logo brand="facebook" />
		<Logo brand="microsoft" />
	</Row>

	<Row gap="lg" width="100%">
		<List variant="outlined" itemvariant="soft" p={5} gap="ss">
			<ListItem>Item 1: some grocery stuff</ListItem>
			<ListItem>Item 2</ListItem>
			<ListItem>Item 3</ListItem>
			<ListItem>Item 4</ListItem>
			<ListItem>Item 5</ListItem>
		</List>

		<List
			variant="outlined"
			p="sm"
			color="danger"
			gap="md"
			shape="rounded"
			itemvariant="solid"
			itemcolor="danger"
			itemshape="pill"
			itemsize="sm"
		>
			<ListButtonItem suffix="clear">Item 1: some grocery stuff</ListButtonItem>
			<ListButtonItem prefix="check">Item 2</ListButtonItem>
			<ListButtonItem color="black">Item 3</ListButtonItem>
			<ListButtonItem color="primary">Item 4</ListButtonItem>
			<Divider color="danger" />
			<List
				direction="row"
				variant="soft"
				p="ss"
				color="black"
				gap="sm"
				shape="rounded"
				itemshape="rounded"
				itemsize="sm"
			>
				<ListButtonItem prefix="home" selected></ListButtonItem>
				<ListButtonItem prefix="search"></ListButtonItem>
				<ListButtonItem prefix="person"></ListButtonItem>
				<Divider vertical size="lg" />
				<ListButtonItem prefix="settings"></ListButtonItem>
				<ListButtonItem prefix="delete"></ListButtonItem>
			</List>
		</List>
	</Row>

	<Snackbar
		align="center"
		title="Notification alert"
		position="right"
		prefix="notifications"
		color="success"
		variant="solid"
		bind:openned
	>
		102 unread messages since last month.
	</Snackbar>
</Col>
