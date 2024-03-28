<script>
	import { Tabs, Tab, TabPanels } from '$lib/navigation';
	import Avatars from './avatars.svelte';
	import Buttons from './buttons.svelte';
	import Displays from './displays.svelte';
	import Feedbacks from './feedbacks.svelte';
	import Inputs from './inputs.svelte';
	import Typography from './typography.svelte';
</script>

<Tabs for="tab-panels-0">
	<Tab prefix="search">Buttons</Tab>
	<Tab prefix="mail">Inputs</Tab>
	<Tab prefix="settings">Feedbacks</Tab>
	<Tab prefix="settings">Badges & tooltips</Tab>
	<Tab prefix="person">Avatars</Tab>
	<Tab prefix="text_fields">Typography</Tab>
</Tabs>

<TabPanels id="tab-panels-0">
	<Buttons />
	<Inputs />
	<Feedbacks />
	<Displays />
	<Avatars />
	<Typography />
</TabPanels>
