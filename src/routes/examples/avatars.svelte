<script>
	import { Avatar } from "$lib/display";
import { Col, Row } from "$lib/layout";
</script>

<Col gap="md" width="full">
  <Row gap="md" width="full">
    <Avatar size="lg" />
    <Avatar size="lg" alt="Jimmie Lovell" />
    <Avatar size="lg">JL</Avatar>
    <Avatar size="lg" />
  </Row>

  <Row gap="md" width="full">
    <Avatar color="success" variant="solid" />
    <Avatar alt="Jimmie Lovell" />
    <Avatar>JL</Avatar>
    <Avatar />
  </Row>

  <Row gap="md" width="full">
    <Avatar size="sm" />
    <Avatar size="sm" alt="Jimmie Lovell" />
    <Avatar size="sm">JL</Avatar>
    <Avatar size="sm" />
  </Row>

</Col>