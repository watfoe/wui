<script lang="ts">
	import { Button } from '$lib/button';
	import { Col } from '$lib/col';
	import { Input } from '$lib/input';
	import { Menu, MenuItem } from '$lib/menu';
	import { Row } from '$lib/row';

	let name = $state('');
</script>

<Col gap="lg">
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
		<Input
			type="search"
			variant="solid"
			textvariant="heading"
			color="warning"
			label="Search"
			class="input"
		/>
		<Input type="search" variant="outlined" color="warning" label="Search" class="input" required />
		<Input type="search" variant="soft" color="warning" label="Search" class="input" required />
		<Input type="search" variant="plain" color="warning" label="Search" class="input" />
	</Row>
</Col>
