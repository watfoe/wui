<script lang="ts">
	import { Col } from '$lib/col';
	import { Row } from '$lib/row';
	import Playground, { type PlaygroundAttributes } from '$lib/playground/index.svelte';
	import { Text } from '$lib/text';
	import { Surface } from '$lib/surface';
	import CodeViewer from '$lib/codeviewer/index.svelte';

	let values: PlaygroundAttributes['values'] = $state({
		variant: 'soft',
		color: 'primary',
		shape: 'rounded'
	});
</script>

<svelte:head>
	<title>Wui Surface Component</title>
</svelte:head>

<Col items="start" gap="md" width="70%">
	<Text variant="title" size="md">Surface</Text>

	Surface is the foundational component that provides consistent styling and layout capabilities.
	It's a versatile container that can be configured for spacing, layout, color schemes, and more.

	<Text variant="heading" size="lg">Introduction</Text>
	<Playground bind:values>
		<Surface
			variant={values?.variant}
			shape={values?.shape}
			color={values?.color}
			p="lg"
			direction="column"
			gap="md"
		>
			<Text>Surface</Text>
		</Surface>

		<CodeViewer code={`<Surface ${values?.variant && 'variant="' + values.variant + '"'} />`} />
	</Playground>

	<Text variant="heading" size="lg">Basics</Text>

	<Text variant="heading" size="sm">Container Behavior</Text>
	<Playground>
		<Row gap="md">
			<Surface variant="outlined" p="sm" height="100px" width="100px">Fixed Size</Surface>
			<Surface variant="outlined" p="sm" width="50%">Percentage Width</Surface>
			<Surface variant="outlined" p="sm" width="100px">Auto Height</Surface>
		</Row>
	</Playground>

	<Text variant="heading" size="sm">Flexbox Layout</Text>
	<Playground>
		<Row variant="outlined" justify="between" items="center" p="sm" gap="md">
			<Surface variant="soft" p="sm">Item 1</Surface>
			<Surface variant="soft" p="sm">Item 2</Surface>
			<Surface variant="soft" p="sm">Item 3</Surface>
		</Row>

		<CodeViewer
			code={`
			<Row variant="outlined" justify="between" items="center" p="sm" gap="md">
				<Surface variant="soft" p="sm">Item 1</Surface>
				<Surface variant="soft" p="sm">Item 2</Surface>
				<Surface variant="soft" p="sm">Item 3</Surface>
			</Row>
		`}
		/>
	</Playground>

	<Text variant="heading" size="lg">Customization</Text>

	<Text variant="heading" size="sm">variant</Text>
	<Playground>
		<Row gap="md">
			<Surface variant="solid" color="primary" p="sm">solid</Surface>
			<Surface variant="soft" color="primary" p="sm">soft</Surface>
			<Surface variant="outlined" color="primary" p="sm">outlined</Surface>
			<Surface variant="mixed" color="primary" p="sm">mixed</Surface>
			<Surface variant="plain" color="primary" p="sm">plain</Surface>
		</Row>
	</Playground>

	<Text variant="heading" size="sm">color</Text>
	<Playground>
		<Row gap="md">
			<Surface variant="solid" color="primary" p="sm">primary</Surface>
			<Surface variant="solid" color="neutral" p="sm">neutral</Surface>
			<Surface variant="solid" color="success" p="sm">success</Surface>
			<Surface variant="solid" color="warning" p="sm">warning</Surface>
			<Surface variant="solid" color="error" p="sm">error</Surface>
		</Row>
	</Playground>

	<Text variant="heading" size="sm">shape</Text>
	<Playground>
		<Row gap="md">
			<Surface variant="outlined" shape="sharp" p="sm">sharp</Surface>
			<Surface variant="outlined" shape="rounded" p="sm">rounded</Surface>
			<Surface variant="outlined" shape="pill" p="sm" width="100px" justify="center">pill</Surface>
			<Surface variant="outlined" shape="circle" width="50px" height={50}>c</Surface>
		</Row>
	</Playground>

	<Text variant="heading" size="sm">
		padding <pre><code style="font-family: monospace">(p | px | py | pt | pr | pb | pl)</code></pre>
	</Text>
	<Playground>
		<Row gap="md">
			<Surface variant="outlined" p="sm">sm</Surface>
			<Surface variant="outlined" p="md">md</Surface>
			<Surface variant="outlined" p="lg">lg</Surface>
			<Surface variant="outlined" p="xl">xl</Surface>
			<Surface variant="outlined" px="lg" py="sm">Custom</Surface>
		</Row>
	</Playground>

	<Text variant="heading" size="lg">Accessibility</Text>

	The Surface component is designed to be accessible by default: - Uses semantic HTML elements when
	appropriate (`element` prop) - Maintains proper color contrast ratios - Supports keyboard
	navigation when used as an interactive element - Preserves correct document structure

	<Text variant="heading" size="lg">Anatomy</Text>

	<CodeViewer
		code={`
	<div class="w-solid w-primary w-rounded" style="--w-clr-bg:var(--color-primary-6);--w-clr-fg:var(--color-white);">
		<!-- Content -->
	</div>
	`}
	/>

	<Text variant="heading" size="lg">API</Text>

	<Text variant="heading" size="sm">Import</Text>

	<CodeViewer code={`import {Surface} from 'wui/surface';`} />

	<Text variant="heading" size="sm">Props</Text>

	<!-- <PropsTable props={props} /> -->
</Col>
