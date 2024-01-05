<script lang="ts">
  import { Button } from "$lib/button";
	import { Input, Select } from "$lib/inputs";
	import Option from "$lib/inputs/select/option.svelte";
	import { Col, Row } from "$lib/layout";
	import { Link, Text } from "$lib/typography";

  let is_gender_custom = false;

  function gender_changed(e: Event) {
    // @ts-ignore
    is_gender_custom = e.target.value === 'o'
  }
  
  function submit(e: Event) {
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());
    console.log(body)
  }
</script>

<Col gap="lg" width="full">
  <Row gap="md" width="full">
    <Input type="text" variant="solid" color="primary" label="Name" class="input" />
    <Input type="text" variant="outline" color="primary" label="Name" class="input" />
    <Input type="text" variant="soft" color="primary" label="Name" class="input" />
    <Input type="text" variant="plain" color="primary" label="Name" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="email" variant="solid" label="Email" class="input" validateon="change" />
    <Input type="email" variant="outline" label="Email" class="input" validateon="change" required />
    <Input type="email" variant="soft" label="Email" class="input" validateon="change" required />
    <Input type="email" variant="plain" label="Email" class="input" validateon="change" />
  </Row>

  <Row gap="md" width="full">
    <Input type="password" variant="solid" color="success" label="Password" class="input" validateon="blur" required />
    <Input type="password" variant="outline" color="success" label="Password" class="input" validateon="blur" required />
    <Input type="password" variant="soft" color="success" label="Password" class="input" validateon="blur" required />
    <Input type="password" variant="plain" color="success" label="Password" class="input" validateon="blur" required />
  </Row>

  <Row gap="md" width="full">
    <Input type="search" variant="solid" color="warning" label="Search" class="input" />
    <Input type="search" variant="outline" color="warning" label="Search" class="input" required />
    <Input type="search" variant="soft" color="warning" label="Search" class="input" required />
    <Input type="search" variant="plain" color="warning" label="Search" class="input" />
  </Row>

  <Row gap="md" width="full">
    <Input type="date" variant="solid" label="Date" class="input" validateon="blur" required />
    <Input type="date" variant="outline" label="Date" class="input" validateon="blur" required />
    <Input type="date" variant="soft" label="Date" class="input" validateon="blur" required />
    <Input type="date" variant="plain" label="Date" class="input" validateon="blur" required />
  </Row>

  <form class="WAuth-form" on:submit={submit}>
    <Col gap="md">
      <Text variant="title" size="lg">Create a Watfoe account</Text>
      <Text variant="title" size="md">Basic information</Text>
    </Col>

    <Col align="flex-end" gap="lg">
      <Row gap="nm" width="full">
        <Input name="firstname" label="First name" required />
        <Input name="lastname" label="Last name" />
      </Row>

      <Input name="birthdate" type="date" label="Date of birth" description="Learn why we require your birthdate." required />

      <Select name="gender" label="Gender" on:change={gender_changed} required>
        <Link href="https://www.google.com" target="_blank" variant="label" size="sm" slot="description">Learn why we require your gender</Link>
        <Option value="f">Female</Option>
        <Option value="m">Male</Option>
        <Option value="o">Custom</Option>
      </Select>

      {#if is_gender_custom}
        <Input name="custom_gender" type="text" label="What is your gender" required />
        <Input name="gender_pronoun" type="text" label="Refer to me as" description="Learn why we require your gender." />
      {/if}

      <Row justify="flex-end">
        <Button type="submit">Continue</Button>
      </Row>
    </Col>
  </form>

  <Row justify="space-between" class="WAuth-footer">
    <Text size="sm" color="primary">Help</Text>
    <Text size="sm" color="primary">Privacy</Text>
    <Text size="sm" color="primary">Terms</Text>
  </Row>

</Col>

<style>
  :global(.WAuth-form) {
    border: 1px solid var(--color-grey-3);
    border-radius: var(--radius);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-xl);
    padding: var(--space-xl);
    width: 420px;
  }

  :global(.WAuth-footer) {
    padding: 0 var(--space-xl);
    width: 420px;
  }
</style>
