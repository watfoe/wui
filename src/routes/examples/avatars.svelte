<script>
	import { Avatar } from '$lib/avatar';
	import { AvatarGroup } from '$lib/avatargroup';
	import { Row } from '$lib/row';
	import { TabPanel } from '$lib/tabs';
</script>

<TabPanel gap="md">
	<Row gap="md" width="100%">
		<Avatar color="neutral" />
		<Avatar color="success" alt="Jimmie Lovell" />
		<Avatar color="warning">JL</Avatar>
		<Avatar color="danger" />
	</Row>

	<Row gap="md" width="100%">
		<Avatar variant="solid" shape="sharp" />
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
</TabPanel>
