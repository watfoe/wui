<script>
	import { Tabs, Tab, TabPanels } from '$lib/navigation';
	import Avatars from './avatars.svelte';
	import Buttons from './buttons.svelte';
	import Displays from './displays.svelte';
	import Modals from './modals.svelte';
	import Inputs from './inputs.svelte';
	import Typography from './typography.svelte';
	import Menus from './menus.svelte';
</script>

<Tabs for="tab-panels-0" selected={2} color="warning">
	<Tab prefix="buttons_alt">Buttons</Tab>
	<Tab prefix="check_box_outline_blank">Inputs</Tab>
	<Tab prefix="menu">Menus</Tab>
	<Tab prefix="layers">Modals</Tab>
	<Tab prefix="app_badging">Badges & tooltips</Tab>
	<Tab prefix="person">Avatars</Tab>
	<Tab prefix="text_fields">Typography</Tab>
</Tabs>

<TabPanels id="tab-panels-0">
	<Buttons />
	<Inputs />
	<Menus />
	<Modals />
	<Displays />
	<Avatars />
	<Typography />
</TabPanels>
