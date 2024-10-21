<script>
	import { Button } from '$lib/button';
	import { Modal } from '$lib/modal';
	import { TabPanel } from '$lib/tabs';

	const positions = ['top', 'center', 'bottom'];
</script>

{#snippet modal(position)}
	<Modal id="{position}-modal" title="Some words in here for fun" {position}></Modal>
{/snippet}

<TabPanel items="center" justify="center" gap="lg">
	{#each positions as position}
		<Button anchorfor="{position}-modal" class="button" style="text-transform:capitalize">
			{position}
		</Button>

		{@render modal(position)}
	{/each}
</TabPanel>
