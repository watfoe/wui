<script>
	import { Button } from '$lib/button';
	import { Divider } from '$lib/divider';
	import { Menu, MenuItem } from '$lib/menu';
	import { Row } from '$lib/row';
	import { TabPanel } from '$lib/tabs';

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
		<Divider colorweight="2" />
		<MenuItem prefix="logout" color="error">Logout</MenuItem>
	</Menu>
{/snippet}

<TabPanel items="center" justify="center" gap="lg">
	{#each positions as row}
		<Row justify="between" width={840}>
			{#each row as position}
				<Button anchorfor="{position}-menu" class="button" style="text-transform:capitalize">
					{position}
				</Button>

				{@render menu(position)}
			{/each}
		</Row>
	{/each}
</TabPanel>
