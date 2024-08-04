<script lang="ts">
	import { Col } from '$lib/col';
	import { Button } from '$lib/button';
	import { Input } from '$lib/input';
	import { Menu, MenuItem } from '$lib/menu';
	import Playground, { type PlaygroundAttributes } from '../playground/index.svelte';
	import { Text } from '$lib/text';

	let values: PlaygroundAttributes['values'] = $state({
		color: 'primary',
		variant: 'outlined',
		size: 'md',
		shape: 'rounded',
		disabled: false
	});
</script>

<svelte:head>
	<title>Wui Input Component</title>
</svelte:head>

<Col align="flex-start" gap="md" width="100%">
	<Text variant="heading" size="lg">Input</Text>
	<Playground bind:values>
		<Input
			color={values?.color}
			variant={values?.variant}
			size={values?.size}
			shape={values?.shape}
			disabled={values?.disabled}
			label="Label"
			placeholder="Placeholder"
			width={300}
		/>
	</Playground>

	<Text variant="heading" size="sm">Label</Text>
	<Playground>
		<Input label="Label" />
	</Playground>

	<Text variant="heading" size="sm">Types</Text>
	<Playground>
		<Input type="text" label="Text (default)" />
		<Input type="email" label="Email" />
		<Input type="tel" label="Phone" />
		<Input type="password" label="Password" />
		<Input type="date" label="Date" />
		<Input type="search" label="Search" />
	</Playground>

	<Text variant="heading" size="sm">Prefix & Suffix</Text>
	<Playground>
		<Input type="text" prefix="search" />
		<Input>
			{#snippet suffix()}
				<Button
					color="neutral"
					anchorfor="some-menu-input"
					variant="solid"
					shape="circle"
					prefix="more_horiz"
				/>
				<Menu id="some-menu-input" position="top" itemsize="sm">
					<MenuItem prefix="check" selected>Checked</MenuItem>
					<MenuItem prefix="clear">Cleared</MenuItem>
				</Menu>
			{/snippet}
		</Input>
	</Playground>
</Col>
