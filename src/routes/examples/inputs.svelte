<script>
	import { Input } from "$lib/inputs";
	import { Col, Row } from "$lib/layout";
</script>

<Col gap="lg" width="full">
  <Row gap="md" width="full">
    <Input type="date" variant="solid" color="danger" label="Date" class="input" />
    <Input type="date" variant="outline" color="danger" label="Date" class="input" />
    <Input type="date" variant="soft" color="danger" label="Date" class="input" />
    <Input type="date" variant="plain" color="danger" label="Date" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="text" variant="solid" color="primary" label="Name" class="input" />
    <Input type="text" variant="outline" color="primary" label="Name" class="input" required />
    <Input type="text" variant="soft" color="primary" label="Name" class="input" required />
    <Input type="text" variant="plain" color="primary" label="Name" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="email" variant="solid" label="Email" class="input" />
    <Input type="email" variant="outline" label="Email" class="input" required />
    <Input type="email" variant="soft" label="Email" class="input" required />
    <Input type="email" variant="plain" label="Email" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="password" variant="solid" color="success" label="Password" class="input" />
    <Input type="password" variant="outline" color="success" label="Password" class="input" required />
    <Input type="password" variant="soft" color="success" label="Password" class="input" required />
    <Input type="password" variant="plain" color="success" label="Password" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="search" variant="solid" color="warning" label="Search" class="input" />
    <Input type="search" variant="outline" color="warning" label="Search" class="input" required />
    <Input type="search" variant="soft" color="warning" label="Search" class="input" required />
    <Input type="search" variant="plain" color="warning" label="Search" class="input" />
  </Row>
</Col>
