<script>
	import { Input } from "$lib/inputs";
	import { Col } from "$lib/layout";
</script>

<Col gap="md">
  <Input type="email" label="Email" class="input" />
  <Input type="phone" label="Phone" class="input" required />
  <Input type="password" label="Password" class="input" required />
  <Input type="search" label="Search" class="input" />
</Col>
