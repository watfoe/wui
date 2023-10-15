<script lang="ts">
  import {tooltip} from '$lib/utils';
  import {Button, Anchor} from '$lib/buttons';
  import {Icon} from '$lib/display';
  import {Col} from '$lib/layout';
  import {Menu} from '$lib/navigation';
  import {Input} from '$lib/inputs';
</script>

<Col align="center" justify="space-between" gap="13">
  <header class="header" title="This is some title for you buddy!" use:tooltip={'left'}></header>

  <Menu id="feedback"></Menu>

  <Anchor for="feedback" appearance="secondary" icon-name="home" class="button">Something better</Anchor>

  <Input type="email" label="Email" class="input" />
  <Input type="phone" label="Phone" class="input" required />
  <Input type="password" label="Password" class="input" required />
  <Input type="search" label="Search" prefix={{
    name: 'search',
    size: 20,
  }} class="input" />
  <Input type="pin" class="input" required />
  <Anchor for="feedback" class="button">Continue</Anchor>
</Col>

<style lang="scss">
  .header {
    width: 100px;
    height: 100px;
    background-color: green;
  }

  .menu {
    width: 300px;
    height: 500px;
  }

  .input, .button {
    width: 300px;
  }
</style>