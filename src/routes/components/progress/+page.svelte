<script>
	import { Progress } from '$lib/progress';
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
</script>

<Col width="100%" gap="lg">
	<Row gap="lg">
		<Progress shape="circular" />
		<Progress shape="circular" variant="solid" />
		<Progress shape="circular" variant="outlined" />
		<Progress shape="circular" variant="plain" />
	</Row>

	<Row gap="lg">
		<Progress shape="circular" />
		<Progress shape="circular" color="neutral" />
		<Progress shape="circular" color="success" />
		<Progress shape="circular" color="warning" />
		<Progress shape="circular" color="danger" />
	</Row>

	<Progress shape="linear" />
	<Progress shape="linear" variant="solid" />
	<Progress shape="linear" variant="outlined" />
	<Progress shape="linear" variant="plain" />
</Col>
