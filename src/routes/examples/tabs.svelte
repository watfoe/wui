<script>
  import { Tabs, Tab, TabPanels } from "$lib/navigation";
	import Avatars from "./avatars.svelte";
	import Buttons from "./buttons.svelte";
	import Displays from "./displays.svelte";
	import Feedbacks from "./feedbacks.svelte";
	import Inputs from "./inputs.svelte";
  import Typography from "./typography.svelte";
</script>

<Tabs for="tab-panels-0">
  <Tab icon="search" active>Buttons</Tab>
  <Tab icon="mail">Inputs</Tab>
  <Tab icon="settings">Feedbacks</Tab>
  <Tab icon="settings">Badges & tooltips</Tab>
  <Tab icon="person">Avatars</Tab>
  <Tab icon="text_fields">Typography</Tab>
</Tabs>

<TabPanels id="tab-panels-0">
  <Buttons />
  <Inputs />
  <Feedbacks />
  <Displays />
  <Avatars />
  <Typography />
</TabPanels>