<script>
	import { Input } from "$lib/inputs";
	import { Col } from "$lib/layout";
</script>

<Col gap="13">

  <Input type="email" label="Email" class="input" />
  <Input type="phone" label="Phone" class="input" required />
  <Input type="password" label="Password" class="input" required />
  <Input type="search" label="Search" prefix={{
    name: 'search'
  }} class="input" />
  <Input type="pin" class="input" required />
</Col>
