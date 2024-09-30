<script>
	import { Button } from '$lib/button';
	import { Row } from '$lib/row';
	import { TabPanel } from '$lib/tabs';
</script>

<TabPanel gap="md">
	<Row gap="md" width="100%">
		<Button variant="solid" class="button">Primary Solid</Button>
		<Button variant="outlined" class="button">Primary Outline</Button>
		<Button variant="soft" class="button">Primary Soft</Button>
		<Button variant="plain" class="button">Primary Plain</Button>

		<Button variant="solid" prefix="person" shape="circle" />
		<Button variant="outlined" prefix="person" shape="sharp" />
		<Button variant="soft" prefix="person" />
		<Button variant="plain" prefix="person" />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" color="neutral" class="button">Neutral Solid</Button>
		<Button variant="outlined" color="neutral" class="button">Neutral Outline</Button>
		<Button variant="soft" color="neutral" class="button">Neutral Soft</Button>
		<Button variant="plain" color="neutral" class="button">Neutral Plain</Button>

		<Button variant="solid" color="neutral" prefix="person" />
		<Button variant="outlined" color="neutral" prefix="person" />
		<Button variant="soft" color="neutral" prefix="person" />
		<Button variant="plain" color="neutral" prefix="person" />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" color="success" class="button">Success Solid</Button>
		<Button variant="outlined" color="success" class="button">Success Outline</Button>
		<Button variant="soft" color="success" class="button">Success Soft</Button>
		<Button variant="plain" color="success" class="button">Success Plain</Button>

		<Button variant="solid" color="success" prefix="person" />
		<Button variant="outlined" color="success" prefix="person" />
		<Button variant="soft" color="success" prefix="person" />
		<Button variant="plain" color="success" prefix="person" />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" color="warning" class="button">Warning Solid</Button>
		<Button variant="outlined" color="warning" class="button">Warning Outline</Button>
		<Button variant="soft" color="warning" class="button">Warning Soft</Button>
		<Button variant="plain" color="warning" class="button">Warning Plain</Button>

		<Button variant="solid" color="warning" prefix="person" />
		<Button variant="outlined" color="warning" prefix="person" />
		<Button variant="soft" color="warning" prefix="person" />
		<Button variant="plain" color="warning" prefix="person" />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" color="error" class="button">error Solid</Button>
		<Button variant="outlined" color="error" class="button">error Outline</Button>
		<Button variant="soft" color="error" class="button">error Soft</Button>
		<Button variant="plain" color="error" class="button">error Plain</Button>

		<Button variant="solid" color="error" prefix="person" />
		<Button variant="outlined" color="error" prefix="person" />
		<Button variant="soft" color="error" prefix="person" />
		<Button variant="plain" color="error" prefix="person" />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" class="button" disabled>Disabled Solid</Button>
		<Button variant="outlined" class="button" disabled>Disabled Outline</Button>
		<Button variant="soft" class="button" disabled>Disabled Soft</Button>
		<Button variant="plain" class="button" disabled>Disabled Plain</Button>

		<Button variant="solid" prefix="person" disabled />
		<Button variant="outlined" prefix="person" disabled />
		<Button variant="soft" prefix="person" disabled />
		<Button variant="plain" prefix="person" disabled />
	</Row>

	<Row gap="md" width="100%">
		<Button variant="solid" class="button" loading>error Solid</Button>
		<Button variant="outlined" class="button" loading>error Outline</Button>
		<Button variant="soft" class="button" loading>error Soft</Button>
		<Button variant="plain" class="button" loading>error Plain</Button>

		<Button variant="solid" prefix="person" loading />
		<Button variant="outlined" prefix="person" loading />
		<Button variant="soft" prefix="person" loading />
		<Button variant="plain" prefix="person" loading />
	</Row>
</TabPanel>
