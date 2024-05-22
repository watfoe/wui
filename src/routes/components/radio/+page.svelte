<script lang="ts">
	import { Col } from '$lib/col';
	import { Radio } from '$lib/radio';
	import { RadioGroup } from '$lib/radiogroup';
	import { Row } from '$lib/row';
</script>

<Col gap="lg">
	<Row gap="lg" width="100%">
		<Radio label="Primary small radio" name="radio" size="sm" color="primary" checked />
		<Radio label="Neutral medium radio" name="radio" size="md" />
		<Radio label="Large success radio" name="radio" size="lg" color="success" />
		<Radio label="Warning radio" name="radio" color="warning" />
		<Radio label="Danger radio" name="radio" color="danger" />
	</Row>

	<RadioGroup label="This is a radio group" description="And this is the radio group description">
		<Radio name="acctype" label="Personal" />
		<Radio name="acctype" label="Business" />
		<Radio name="acctype" label="Other" />
	</RadioGroup>
</Col>
