<script>
	import { Button } from "$lib/button";
	import { Divider } from "$lib/display";
	import { Modal } from "$lib/feedback";
	import { Col } from "$lib/layout";
	import { Menu } from "$lib/navigation";
	import MenuItem from "$lib/navigation/menu/menu-item.svelte";
</script>

<Col gap="md">
	<Button anchorfor="feedback" icon="home" class="button">Something better</Button>
	<Button anchorfor="modal" icon="home"></Button>

	<Menu id="feedback">
		<MenuItem icon="home">Home</MenuItem>
		<MenuItem icon="apps" selected>Dashboard</MenuItem>
		<MenuItem icon="settings">Settings</MenuItem>
		<Divider />
		<MenuItem icon="logout" color="danger">Logout</MenuItem>
	</Menu>

	<Modal id="modal" title="Some words in here for fun"></Modal>
</Col>