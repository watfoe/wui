<script>
	import { Avatar } from '$lib/display';
	import AvatarGroup from '$lib/display/avatar/avatar-group.svelte';
	import { Col, Row } from '$lib/layout';
</script>

<Col align="flex-start" gap="md" width="100%">
	<Row gap="md" width="100%">
		<Avatar color="neutral" />
		<Avatar color="success" alt="Jimmie Lovell" />
		<Avatar color="warning">JL</Avatar>
		<Avatar color="danger" />
	</Row>

	<Row gap="md" width="100%">
		<Avatar variant="solid" shape="square" />
		<Avatar alt="Jimmie Lovell" variant="outlined" />
		<Avatar variant="soft">JL</Avatar>
		<Avatar variant="plain" />
	</Row>

	<AvatarGroup color="danger" shape="rounded">
		<Avatar />
		<Avatar alt="Jimmie Lovell" />
		<Avatar>JL</Avatar>
		<Avatar />
	</AvatarGroup>

	<Row gap="md" width="100%">
		<Avatar size="lg" />
		<Avatar alt="Jimmie Lovell" />
		<Avatar size="sm">JL</Avatar>
	</Row>
</Col>
