<script>
	import { Button } from '$lib/buttons';
	import { Badge, Icon, List, ListItem, Logo, Tooltip } from '$lib/display';
	import { Col, Row } from '$lib/layout';
	import { Sheet } from '$lib/surfaces';
</script>

<Col gap="lg" width="full">
	<Row gap="lg" width="full">
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
			<Icon slot="content" size="sm">settings</Icon>
			<Icon>mail</Icon>
		</Badge>

		<Badge color="warning">
			<Icon slot="content" size="sm">settings</Icon>
			<Icon>mail</Icon>
		</Badge>

		<Badge content="200" max={99} color="danger">
			<Icon>mail</Icon>
		</Badge>
	</Row>

	<Row gap="lg" width="full">
		<Tooltip title="Please click me" position="top">
			<Button class="button">Continue</Button>
		</Tooltip>

		<Tooltip title="This a menu" position="bottom">
			<Icon>person</Icon>
		</Tooltip>

		<Tooltip title="mail settings">
			<Badge color="warning">
				<Icon slot="content" size="sm">settings</Icon>
				<Icon>mail</Icon>
			</Badge>
		</Tooltip>
	</Row>

	<Row gap="lg" width="full">
		<Logo size={200} />
		<Logo size={100} />
		<Logo size={60} />
	</Row>

	<Row gap="lg" width="full">
		<Logo brand="google" />
		<Logo brand="apple" />
		<Logo brand="facebook" />
		<Logo brand="microsoft" />
	</Row>

	<Row gap="lg" width="full">
		<Sheet variant="outline">
			<List size="md">
				<ListItem gap="lg" suffix="clear">Item 1: some grocery stuff</ListItem>
				<ListItem prefix="check">Item 2</ListItem>
				<ListItem>Item 3</ListItem>
				<ListItem>Item 4</ListItem>
				<ListItem>Item 5</ListItem>
			</List>
		</Sheet>
	</Row>
</Col>
