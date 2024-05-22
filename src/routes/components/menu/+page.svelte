<script>
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Divider } from '$lib/divider';
	import { Menu, MenuItem } from '$lib/menu';
	import { Row } from '$lib/row';

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
		<MenuItem prefix="logout" color="danger">Logout</MenuItem>
	</Menu>
{/snippet}

<Col align="center" justify="center" gap="lg">
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
