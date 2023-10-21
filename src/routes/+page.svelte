<script lang="ts">
  import {Button, Anchor} from '$lib/buttons';
  import {Badge, Icon, Tooltip} from '$lib/display';
  import {Col} from '$lib/layout';
  import {Menu, Tabs, Tab} from '$lib/navigation';
  import {Input} from '$lib/inputs';
</script>

<Col align="center" justify="space-between" gap="13">
  <Menu id="feedback"></Menu>

  <Anchor for="feedback" appearance="secondary" iconname="home" class="button">Something better</Anchor>

  <Input type="email" label="Email" class="input" />
  <Input type="phone" label="Phone" class="input" required />
  <Input type="password" label="Password" class="input" required />
  <Input type="search" label="Search" prefix={{
    name: 'search',
    size: 20,
  }} class="input" />
  <Input type="pin" class="input" required />

  <Tooltip title="Please click me" position="top">
    <Anchor for="feedback" class="button">Continue</Anchor>
  </Tooltip>

  <Badge count="1" position="top">
    <Icon name="menu" size={20} />
  </Badge>

  <Tabs for="some-tab">
    <Tab active icon="search">Search</Tab>
    <Tab icon="mail">Unread</Tab>
    <Tab icon="settings">Settings</Tab>
  </Tabs>
</Col>

<style>
  @import './style.css';
</style>
