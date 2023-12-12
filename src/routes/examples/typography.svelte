<script>
	import { Col, Row } from "$lib/layout";
  import { Text } from "$lib/typography";
</script>

<Col gap="md" width="full">
  <Row align="flex-end" gap="md" width="full">
    <Text variant="headline" size="lg">Large Headline</Text>
    <Text variant="headline" size="md">Medium Headline</Text>
    <Text variant="headline" size="sm">Small Headline</Text>
  </Row>

  <Row align="flex-end" gap="md" width="full">
    <Text variant="title" size="lg">Large Title</Text>
    <Text variant="title" size="md">Medium Title</Text>
    <Text variant="title" size="sm" color="danger">Small Title</Text>
  </Row>
</Col>