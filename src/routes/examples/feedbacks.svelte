<script>
	import { Anchor } from "$lib/buttons";
	import { Col } from "$lib/layout";
	import { Menu } from "$lib/navigation";
	import MenuItem from "$lib/navigation/menu/menu-item.svelte";
</script>

<Col>
	<Anchor for="feedback" icon="home" class="button">Something better</Anchor>
	<Menu id="feedback">
		<MenuItem icon="home">Home</MenuItem>
		<MenuItem icon="apps" selected>Dashboard</MenuItem>
		<MenuItem icon="settings">Settings</MenuItem>
		<MenuItem icon="logout" color="danger">Logout</MenuItem>
	</Menu>
</Col>