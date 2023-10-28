<script>
	import { Icon } from "$lib/display";
  import { Tabs, Tab, TabPanels } from "$lib/navigation";
	import Avatars from "./avatars.svelte";
	import Buttons from "./buttons.svelte";
	import Displays from "./displays.svelte";
	import Feedbacks from "./feedbacks.svelte";
	import Inputs from "./inputs.svelte";

</script>
<Tabs for="tab-panels-0">
  <Tab icon="search">buttons</Tab>
  <Tab icon="mail">inputs</Tab>
  <Tab icon="settings">feedbacks</Tab>
  <Tab icon="settings">badges & tooltips</Tab>
  <Tab icon="person">avatars</Tab>

</Tabs>

<TabPanels id="tab-panels-0">
  <Buttons />
  <Inputs />
  <Feedbacks />
  <Displays />
  <Avatars />

</TabPanels>