<script lang="ts">
  import {Button, Anchor} from '$lib/buttons';
  import {Avatar, Badge, Icon, Tooltip} from '$lib/display';
  import {Col, Row} from '$lib/layout';
  import {Menu, Tabs, Tab, TabPanels} from '$lib/navigation';
  import {Input} from '$lib/inputs';
	import AvatarGroup from '$lib/display/avatar/avatar-group.svelte';
</script>

<Col align="center" justify="space-between" gap="13">
  <Menu id="feedback"></Menu>

  <Anchor for="feedback" appearance="secondary" iconname="home" class="button">Something better</Anchor>

  <Input type="email" label="Email" class="input" />
  <Input type="phone" label="Phone" class="input" required />
  <Input type="password" label="Password" class="input" required />
  <Input type="search" label="Search" prefix={{
    name: 'search'
  }} class="input" />
  <Input type="pin" class="input" required />

  <Tooltip title="Please click me" position="top">
    <Anchor for="feedback" class="button">Continue</Anchor>
  </Tooltip>

  <Row gap="40" justify="center">
    <Badge position="top-left">
      <Icon>mail</Icon>
    </Badge>

    <Badge content="JL" color="neutral">
      <Icon>person</Icon>
    </Badge>

    <Badge content="200" color="success" position="bottom-left">
      <Icon>mail</Icon>
    </Badge>

    <Tooltip title="mail settings">
      <Badge color="warning">
        <Icon slot="content" size="sm">settings</Icon>
        <Icon>mail</Icon>
      </Badge>
    </Tooltip>

    <Badge content="200" max={99} color="danger">
      <Icon>mail</Icon>
    </Badge>
  </Row>

  <Tooltip title="This a menu" position="bottom">
    <Icon>person</Icon>
  </Tooltip>

  <Tabs for="tab-panels-0">
    <Tab icon="search">Search</Tab>
    <Tab icon="mail">Unread</Tab>
    <Tab icon="settings">Settings</Tab>
  </Tabs>

  <TabPanels id="tab-panels-0">
    <Row>
      <p>Page 1</p>
      <AvatarGroup>
        <Avatar
          variant="solid"
          alt="Jimmie Lovell"
          src="https://lh3.googleusercontent.com/ogw/AKPQZvzWa0HMGCNDPKPY8kgCcr5h9i6M_6grBFXaICfdbQ=s64-c-mo"
          srcset="https://lh3.googleusercontent.com/ogw/AKPQZvzWa0HMGCNDPKPY8kgCcr5h9i6M_6grBFXaICfdbQ=s32-c-mo 1x, https://lh3.googleusercontent.com/ogw/AKPQZvzWa0HMGCNDPKPY8kgCcr5h9i6M_6grBFXaICfdbQ=s64-c-mo 2x" />
        <Avatar>JL</Avatar>
        <Avatar />
        <Avatar variant="outline" alt="Jimmie Lovell" />
        <Anchor appearance="none" for="feedback">
          <Avatar variant="plain">+3</Avatar>
        </Anchor>

      </AvatarGroup>
    </Row>

    <p>Page 2</p>
    <p>Page 3</p>
  </TabPanels>
</Col>

<style>
  @import './style.css';
</style>
