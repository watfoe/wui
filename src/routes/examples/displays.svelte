<script>
	import { Button } from "$lib/button";
	import { Badge, Icon, Logo, Tooltip } from "$lib/display";
	import { Col, Row } from "$lib/layout";

</script>

<Col gap="lg">
  <Row gap="lg">
    <Badge position="top-left">
      <Icon>mail</Icon>
    </Badge>

    <Badge content="JL" color="neutral">
      <Icon>person</Icon>
    </Badge>

    <Badge content="200" color="success" position="bottom-left">
      <Icon>mail</Icon>
    </Badge>

    <Badge color="warning" position="bottom-right">
      <Icon slot="content" size="sm">settings</Icon>
      <Icon>mail</Icon>
    </Badge>

    <Badge color="warning">
      <Icon slot="content" size="sm">settings</Icon>
      <Icon>mail</Icon>
    </Badge>

    <Badge content="200" max={99} color="danger">
      <Icon>mail</Icon>
    </Badge>
  </Row>

  <Row gap="lg">
    <Tooltip title="Please click me" position="top">
      <Button class="button">Continue</Button>
    </Tooltip>

    <Tooltip title="This a menu" position="bottom">
      <Icon>person</Icon>
    </Tooltip>

    <Tooltip title="mail settings">
      <Badge color="warning">
        <Icon slot="content" size="sm">settings</Icon>
        <Icon>mail</Icon>
      </Badge>
    </Tooltip>
  </Row>

  <Row gap="lg">
    <Logo size={200} />
    <Logo size={100} />
    <Logo size={60} />
  </Row>
</Col>