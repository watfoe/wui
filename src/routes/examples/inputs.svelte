<script lang="ts">
	import { Checkbox, Input, Radio, RadioGroup, Select, Switch } from '$lib/inputs';
	import { Col, Row } from '$lib/layout';

	let name = $state('');
</script>

<Col gap="lg" width="full">
	<Row gap="md" width="full">
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

	<Row gap="md" width="full">
		<Input type="email" variant="solid" label="Email" class="input" validateon="input" />
		<Input
			type="email"
			variant="outlined"
			label="Email"
			class="input"
			validateon="input"
			required
		/>
		<Input type="email" variant="soft" label="Email" class="input" validateon="input" required />
		<Input type="email" variant="plain" label="Email" class="input" validateon="input" />
	</Row>

	<Row gap="md" width="full">
		<Input
			type="password"
			variant="solid"
			color="success"
			label="Password"
			class="input"
			validateon="blur"
			required
		/>
		<Input
			type="password"
			variant="outlined"
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

	<Row gap="md" width="full">
		<Input type="search" variant="solid" color="warning" label="Search" class="input" />
		<Input type="search" variant="outlined" color="warning" label="Search" class="input" required />
		<Input type="search" variant="soft" color="warning" label="Search" class="input" required />
		<Input type="search" variant="plain" color="warning" label="Search" class="input" />
	</Row>

	<Row gap="md" width="full">
		<Input type="date" variant="solid" label="Date" class="input" validateon="blur" required />
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
	</Row>

	<Row gap="lg" width="full">
		<Radio label="Primary small radio" name="radio" size="sm" color="primary" />
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

	<Row gap="lg" width="full">
		<Checkbox label="Primary small radio" name="checkbox" size="sm" color="primary" />
		<Checkbox label="Neutral medium checkbox" name="checkbox" size="md" />
		<Checkbox label="Large success checkbox" name="checkbox" size="lg" color="success" />
		<Checkbox label="Warning checkbox" name="checkbox" color="warning" />
		<Checkbox label="Danger checkbox" name="checkbox" color="danger" />
	</Row>

	<Row gap="md" width="full">
		<Switch size="sm" color="primary" />
		<Switch size="md" color="neutral" />
		<Switch size="lg" color="success" />
		<Switch color="warning" />
	</Row>
</Col>
