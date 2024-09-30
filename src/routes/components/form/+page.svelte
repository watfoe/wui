<script lang="ts">
	import { Button } from '$lib/button';
	import { Col } from '$lib/col';
	import { Input } from '$lib/input';
	import { Link } from '$lib/link';
	import { Row } from '$lib/row';
	import { Select } from '$lib/select';
	import type { SurfaceAttributes } from '$lib/surface';
	import { Surface } from '$lib/surface';
	import { Text } from '$lib/text';
	import type { Snippet } from 'svelte';

	interface AuthFormAttributes extends SurfaceAttributes<'form'> {
		heading: string;
		subheading?: string;
		enableprevious?: boolean;
		secondarybutton?: Snippet;
		footer?: Snippet;
	}

	const {
		children,
		heading,
		enableprevious,
		footer,
		subheading,
		secondarybutton,
		style = '',
		...rest
	}: AuthFormAttributes = $props();

	let firstname = $state('');
	let lastname = $state('');
	let birthdate = $state('');
	let gender = $state('');
	let custom_gender = $state(undefined);
	let gender_pronoun = $state(undefined);

	function gender_changed(e: Event & { currentTarget: HTMLInputElement }) {
		if (e.currentTarget.value !== 'custom') {
			custom_gender = undefined;
			gender_pronoun = undefined;
		}
	}
</script>

<Surface
	align="center"
	element="form"
	color="neutral"
	direction="column"
	gap="xl"
	method="post"
	p="lg"
	shape="rounded"
	style="min-height: 602px;{style}"
	variant="outlined"
	width={400}
	action="http://localhost:8000/auth/basic_information"
	{...rest}
>
	<Col gap="md">
		<Text size="lg" variant="heading">{heading}</Text>
		{#if subheading}
			<Text size="md" variant="heading">{subheading}</Text>
		{/if}
	</Col>

	<Col align="end" gap="md" width="100%">
		<Row align="start" gap="sm" width="100%">
			<Input label="First name" bind:value={firstname} required />
			<Input label="Last name" bind:value={lastname} required />
		</Row>

		<Input type="date" label="Birthday" bind:value={birthdate} required>
			{#snippet description()}
				<Link href="https://support.watfoe.com/accounts/answers" target="_blank" size="xs">
					Learn why we ask for your birthday
				</Link>
			{/snippet}
		</Input>

		<Select
			label="Gender"
			preset="gender"
			selected={gender}
			width="100%"
			onchange={gender_changed}
			bind:value={gender}
			required
		>
			{#snippet description()}
				<Link href="https://support.watfoe.com/accounts/answers" target="_blank" size="xs">
					Learn why we ask for your gender
				</Link>
			{/snippet}
		</Select>

		{#if gender === 'custom'}
			<Input
				type="text"
				label="What is your gender?"
				width="100%"
				bind:value={custom_gender}
				required
			/>
			<Input type="text" label="Refer to me as" width="100%" bind:value={gender_pronoun} />
		{/if}
	</Col>

	<Row justify="end" width="100%">
		<Button type="submit">Continue</Button>
	</Row>

	{#if footer}
		{@render footer()}
	{/if}
</Surface>
