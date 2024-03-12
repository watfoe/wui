<script>
	import { Button } from '$lib/buttons';
	import { Divider } from '$lib/display';
	import { Modal } from '$lib/feedback';
	import { Col, Row } from '$lib/layout';
	import { Menu } from '$lib/navigation';
	import MenuItem from '$lib/navigation/menu/menu-item.svelte';
</script>

<Col gap="md" width="full">
	<Row gap="md">
		<Button anchorfor="left-menu" prefix="home" class="button">Left menu</Button>
		<Button anchorfor="center-menu" prefix="home" class="button">Centered menu</Button>
		<Button anchorfor="right-menu" prefix="home" class="button">Right menu</Button>
	</Row>

	<Button anchorfor="modal" prefix="home" class="button">Modal anchor</Button>

	<Menu id="left-menu" align="left">
		<MenuItem prefix="home">Home</MenuItem>
		<MenuItem prefix="apps" selected>Dashboard and Console</MenuItem>
		<MenuItem prefix="settings">Settings</MenuItem>

		<Divider />

		<MenuItem prefix="logout" color="danger">Logout</MenuItem>
	</Menu>

	<Menu id="center-menu" align="center">
		<MenuItem prefix="home">Home</MenuItem>
		<MenuItem prefix="apps" selected>Dashboard and Console</MenuItem>
		<MenuItem prefix="settings">Settings</MenuItem>

		<Divider />

		<MenuItem prefix="logout" color="danger">Logout</MenuItem>
	</Menu>

	<Menu id="right-menu" align="right">
		<MenuItem prefix="home">Home</MenuItem>
		<MenuItem prefix="apps" selected>Dashboard and Console</MenuItem>
		<MenuItem prefix="settings">Settings</MenuItem>

		<Divider />

		<MenuItem prefix="logout" color="danger">Logout</MenuItem>
	</Menu>

	<Modal id="modal" title="Some words in here for fun"></Modal>
</Col>
