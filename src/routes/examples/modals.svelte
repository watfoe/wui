<script>
	import { Button } from '$lib';
	import { Modal } from '$lib/feedback';
	import { Col, Row } from '$lib/layout';

	const positions = ['top', 'center', 'bottom'];
</script>

{#snippet modal(position)}
	<Modal id="{position}-modal" title="Some words in here for fun" {position}></Modal>
{/snippet}

<Col justify="center" gap="lg" width="100%" style="margin-top: 200px">
	{#each positions as position}
		<Button anchorfor="{position}-modal" class="button" style="text-transform:capitalize">
			{position}
		</Button>

		{@render modal(position)}
	{/each}
</Col>
