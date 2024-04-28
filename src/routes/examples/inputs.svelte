<script lang="ts">
	import { Menu } from '$lib';
	import { Button } from '$lib/buttons';
	import { Checkbox, Input, Radio, RadioGroup, Select, Switch, TextArea } from '$lib/inputs';
	import { Col, Row } from '$lib/layout';
	import MenuItem from '$lib/navigation/menu/menu-item.svelte';

	let name = $state('');
</script>

<Col gap="lg" width="100%">
	<Row align="flex-start" gap="md" width="100%">
		<Input
			type="text"
			variant="solid"
			color="primary"
			label="Name"
			class="input"
			bind:value={name}
		/>
		<Input type="text" variant="outlined" color="primary" label="Name" class="input" />
		<Input type="text" variant="soft" color="primary" label="Name" class="input" />
		<Input type="text" variant="plain" color="primary" label="Name" class="input" />
	</Row>

	<Row align="flex-start" gap="md" width="100%">
		<Input type="email" variant="solid" label="Email" class="input" validateon="input" />
		<Input type="email" variant="outlined" label="Email" class="input" validateon="input" required>
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
		<Input type="email" variant="soft" label="Email" class="input" validateon="input" required />
		<Input type="email" variant="plain" label="Email" class="input" validateon="input" />
	</Row>

	<Row align="flex-start" gap="md" width="100%">
		<Input
			type="password"
			variant="solid"
			placeholder="Enter your password"
			color="success"
			label="Password"
			class="input"
			validateon="blur"
			required
		/>
		<Input
			type="password"
			variant="outlined"
			placeholder="Enter your password"
			shape="square"
			color="success"
			label="Password"
			class="input"
			validateon="blur"
			required
		/>
		<Input
			type="password"
			variant="soft"
			color="success"
			label="Password"
			class="input"
			validateon="blur"
			required
		/>
		<Input
			type="password"
			variant="plain"
			color="success"
			label="Password"
			class="input"
			validateon="blur"
			required
		/>
	</Row>

	<Row align="flex-start" gap="md" width="100%">
		<Input type="search" variant="solid" color="warning" label="Search" class="input" />
		<Input type="search" variant="outlined" color="warning" label="Search" class="input" required />
		<Input type="search" variant="soft" color="warning" label="Search" class="input" required />
		<Input type="search" variant="plain" color="warning" label="Search" class="input" />
	</Row>

	<Row align="flex-start" gap="md" width="100%">
		<Input
			type="date"
			variant="solid"
			label="Date"
			class="input"
			validateon="blur"
			required
			disabled
		/>
		<Input
			type="date"
			variant="outlined"
			label="Date"
			class="input"
			validateon="blur"
			value="2021-01-01"
			required
		/>
		<Input type="date" variant="soft" label="Date" class="input" validateon="blur" required />
		<Input type="date" variant="plain" label="Date" class="input" validateon="blur" required />

		<!-- <TextArea label="Description" class="input" prefix="person" /> -->
	</Row>

	<Row gap="lg" width="100%">
		<Radio label="Primary small radio" name="radio" size="sm" color="primary" checked />
		<Radio label="Neutral medium radio" name="radio" size="md" />
		<Radio label="Large success radio" name="radio" size="lg" color="success" />
		<Radio label="Warning radio" name="radio" color="warning" />
		<Radio label="Danger radio" name="radio" color="danger" />

		<RadioGroup label="This is a radio group" description="And this is the radio group description">
			<Radio name="acctype" label="Personal" />
			<Radio name="acctype" label="Business" />
			<Radio name="acctype" label="Other" />
		</RadioGroup>

		<Col gap="sm">
			<Select preset="country" selected="KE" style="width: 300px" variant="solid" shape="square" />
			<Select preset="gender" style="width: 300px" />
			<Select preset="month" style="width: 300px" />
		</Col>
	</Row>

	<Row gap="lg" width="100%">
		<Checkbox label="Primary small radio" name="checkbox" size="sm" color="primary" />
		<Checkbox label="Neutral medium checkbox" name="checkbox" size="md" />
		<Checkbox label="Large success checkbox" name="checkbox" size="lg" color="success" />
		<Checkbox label="Warning checkbox" name="checkbox" color="warning" />
		<Checkbox label="Danger checkbox" name="checkbox" color="danger" />
	</Row>

	<Row align="flex-start" gap="md" width="100%">
		<Switch size="sm" color="primary" />
		<Switch size="md" color="neutral" />
		<Switch size="lg" color="success" />
		<Switch color="warning" />
	</Row>
</Col>
