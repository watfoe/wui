<script>
	import { Button } from "$lib/buttons";
import { Col, Row } from "$lib/layout";
</script>

<Col gap="md">
  <Row justify="center" gap="md">
    <Button variant="solid" class="button">Primary Solid</Button>
    <Button variant="outline" class="button">Primary Outline</Button>
    <Button variant="soft" class="button">Primary Soft</Button>
    <Button variant="plain" class="button">Primary Plain</Button>

    <Button variant="solid" icon="person" />
    <Button variant="outline" icon="person" />
    <Button variant="soft" icon="person" />
    <Button variant="plain" icon="person" />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" color="neutral" class="button">Neutral Solid</Button>
    <Button variant="outline" color="neutral" class="button">Neutral Outline</Button>
    <Button variant="soft" color="neutral" class="button">Neutral Soft</Button>
    <Button variant="plain" color="neutral" class="button">Neutral Plain</Button>

    <Button variant="solid" color="neutral" icon="person" />
    <Button variant="outline" color="neutral" icon="person" />
    <Button variant="soft" color="neutral" icon="person" />
    <Button variant="plain" color="neutral" icon="person" />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" color="success" class="button">Success Solid</Button>
    <Button variant="outline" color="success" class="button">Success Outline</Button>
    <Button variant="soft" color="success" class="button">Success Soft</Button>
    <Button variant="plain" color="success" class="button">Success Plain</Button>

    <Button variant="solid" color="success" icon="person" />
    <Button variant="outline" color="success" icon="person" />
    <Button variant="soft" color="success" icon="person" />
    <Button variant="plain" color="success" icon="person" />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" color="warning" class="button">Warning Solid</Button>
    <Button variant="outline" color="warning" class="button">Warning Outline</Button>
    <Button variant="soft" color="warning" class="button">Warning Soft</Button>
    <Button variant="plain" color="warning" class="button">Warning Plain</Button>

    <Button variant="solid" color="warning" icon="person" />
    <Button variant="outline" color="warning" icon="person" />
    <Button variant="soft" color="warning" icon="person" />
    <Button variant="plain" color="warning" icon="person" />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" color="danger" class="button">Danger Solid</Button>
    <Button variant="outline" color="danger" class="button">Danger Outline</Button>
    <Button variant="soft" color="danger" class="button">Danger Soft</Button>
    <Button variant="plain" color="danger" class="button">Danger Plain</Button>

    <Button variant="solid" color="danger" icon="person" />
    <Button variant="outline" color="danger" icon="person" />
    <Button variant="soft" color="danger" icon="person" />
    <Button variant="plain" color="danger" icon="person" />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" class="button" disabled>Disabled Solid</Button>
    <Button variant="outline" class="button" disabled>Disabled Outline</Button>
    <Button variant="soft" class="button" disabled>Disabled Soft</Button>
    <Button variant="plain" class="button" disabled>Disabled Plain</Button>

    <Button variant="solid" icon="person" disabled />
    <Button variant="outline" icon="person" disabled />
    <Button variant="soft" icon="person" disabled />
    <Button variant="plain" icon="person" disabled />
  </Row>

  <Row justify="center" gap="md">
    <Button variant="solid" class="button" loading>Danger Solid</Button>
    <Button variant="outline" class="button" loading>Danger Outline</Button>
    <Button variant="soft" class="button" loading>Danger Soft</Button>
    <Button variant="plain" class="button" loading>Danger Plain</Button>

    <Button variant="solid" icon="person" loading />
    <Button variant="outline" icon="person" loading />
    <Button variant="soft" icon="person" loading />
    <Button variant="plain" icon="person" loading />
  </Row>
</Col>
