<script>
	import { Badge } from '$lib/badge';
	import { Button } from '$lib/button';
	import { Chip } from '$lib/chip';
	import { Divider } from '$lib/divider';
	import { Icon } from '$lib/icon';
	import { List } from '$lib/list';
	import { ListButtonItem } from '$lib/listbuttonitem';
	import { ListItem } from '$lib/listitem';
	import { Logo } from '$lib/logo';
	import { Row } from '$lib/row';
	import { Snackbar } from '$lib/snackbar';
	import { TabPanel } from '$lib/tabs';
	import { Tooltip } from '$lib/tooltip';

	let openned = $state(false);

	setTimeout(() => {
		openned = true;
	}, 2000);
</script>

<TabPanel gap="lg">
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
		<Badge position="bottom-left" color="error">
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

		<Badge content="200" max={99} color="error">
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
		<Chip>Chip</Chip>
		<Chip color="black">Chip</Chip>
		<Chip color="error" variant="solid">Chip</Chip>
		<Chip color="warning" variant="mixed">Chip</Chip>
	</Row>

	<Row gap="lg" width="100%">
		<Logo brand="google" />
		<Logo brand="apple" />
		<Logo brand="facebook" />
		<Logo brand="microsoft" />
	</Row>

	<Row gap="lg" width="100%">
		<List variant="outlined" p={5} gap="xs">
			<ListItem>Item 1: some grocery stuff</ListItem>
			<ListItem>Item 2</ListItem>
			<ListItem>Item 3</ListItem>
			<ListItem>Item 4</ListItem>
			<ListItem>Item 5</ListItem>
		</List>

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
	</Row>

	<Snackbar
		items="center"
		title="Notification alert"
		position="right"
		prefix="notifications"
		color="success"
		variant="solid"
		bind:openned
	>
		102 unread messages since last month.
	</Snackbar>
</TabPanel>
