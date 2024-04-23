<script>
	import { Button } from '$lib/buttons';
	import { Divider } from '$lib/display';
	import { Col, Row } from '$lib/layout';
	import { Menu } from '$lib/navigation';
	import MenuItem from '$lib/navigation/menu/menu-item.svelte';

	const positions = [
		['left-start', 'top-start', 'top', 'top-end', 'right-start'],
		['left', 'right'],
		['left-end', 'bottom-start', 'bottom', 'bottom-end', 'right-end']
	];
</script>

{#snippet menu(position)}
	<Menu id="{position}-menu" {position}>
		<MenuItem prefix="home">Home</MenuItem>
		<MenuItem prefix="apps" selected>Dashboard</MenuItem>
		<MenuItem prefix="settings">Settings</MenuItem>
		<Divider />
		<MenuItem prefix="logout" color="danger">Logout</MenuItem>
	</Menu>
{/snippet}

<Col justify="center" gap="lg" width="100%" style="margin-top: 200px">
	{#each positions as row}
		<Row justify="space-between" width={840}>
			{#each row as position}
				<Button anchorfor="{position}-menu" class="button" style="text-transform:capitalize">
					{position}
				</Button>

				{@render menu(position)}
			{/each}
		</Row>
	{/each}
</Col>
