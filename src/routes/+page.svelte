<script lang="ts">
	import './style.css';

	import Tabs from './examples/tabs.svelte';
	import { WatfoeContent, WatfoeHeader } from '$lib/watfoe';
</script>

<WatfoeHeader subtitle="Ui" />
<WatfoeContent>
	<Tabs />
</WatfoeContent>
