<script>
	import { Input } from "$lib/inputs";
	import { Col, Row } from "$lib/layout";
</script>

<Col gap="lg">
  <Row gap="md">
    <Input type="search" variant="solid" color="primary" label="Email" class="input" />
    <Input type="search" variant="outline" color="primary" label="Phone" class="input" required />
    <Input type="search" variant="soft" color="primary" label="Password" class="input" required />
    <Input type="search" variant="plain" color="primary" label="Search" class="input" />
  </Row>

  <Row gap="md">
    <Input type="search" variant="solid" label="Email" class="input" />
    <Input type="search" variant="outline" label="Phone" class="input" required />
    <Input type="search" variant="soft" label="Password" class="input" required />
    <Input type="search" variant="plain" label="Search" class="input" />
  </Row>

  <Row gap="md">
    <Input type="search" variant="solid" color="success" label="Email" class="input" />
    <Input type="search" variant="outline" color="success" label="Phone" class="input" required />
    <Input type="search" variant="soft" color="success" label="Password" class="input" required />
    <Input type="search" variant="plain" color="success" label="Search" class="input" />
  </Row>

  <Row gap="md">
    <Input type="search" variant="solid" color="warning" label="Email" class="input" />
    <Input type="search" variant="outline" color="warning" label="Phone" class="input" required />
    <Input type="search" variant="soft" color="warning" label="Password" class="input" required />
    <Input type="search" variant="plain" color="warning" label="Search" class="input" />
  </Row>

  <Row gap="md">
    <Input type="search" variant="solid" color="danger" label="Email" class="input" />
    <Input type="search" variant="outline" color="danger" label="Phone" class="input" required />
    <Input type="search" variant="soft" color="danger" label="Password" class="input" required />
    <Input type="search" variant="plain" color="danger" label="Search" class="input" />
  </Row>
</Col>
