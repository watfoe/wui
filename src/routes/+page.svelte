<script lang="ts">
  import './style.css';

	import { Col, WatfoeHeader } from "$lib/layout";
  import Tabs from "./examples/tabs.svelte";
</script>

<WatfoeHeader subtitle="Ui" />
<Col class="page">
  <Tabs />
</Col>
