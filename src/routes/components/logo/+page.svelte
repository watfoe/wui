<script lang="ts">
	import { Col } from '$lib/col';
	import Playground from '../../../lib/playground/index.svelte';
	import { Text } from '$lib/text';
	import { Logo } from '$lib/logo';
</script>

<svelte:head>
	<title>Wui Logo Component</title>
</svelte:head>

<Col items="start" gap="md" width="100%">
	<Text variant="heading" size="lg">Logo</Text>
	<Playground>
		<Logo />
		<Logo brand="google" />
		<Logo brand="apple" />
		<Logo brand="facebook" />
		<Logo brand="microsoft" />
	</Playground>
</Col>
