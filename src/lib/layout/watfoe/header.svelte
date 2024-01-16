<script lang="ts">
	import { Button } from '$lib/button';
	import { Logo } from '$lib/display';
	import { Row } from '$lib/layout';
	import { Link, Text } from '$lib/typography';

	interface $$Props {
		class?: string;
		subtitle?: string;
	}

	export let subtitle: $$Props['subtitle'] = undefined;
</script>

<Row justify="space-between" class="WAuth-header {$$restProps.class || ''}" width="full">
	<Row align="center" gap="md">
		<Logo size={60} class="WAuth-header__logo" />

		<Row align="center" gap="sm">
			<Text variant="title" size="md" color="primary">Watfoe</Text>
			{#if $$slots.subtitle}
				<slot name="subtitle" />
			{:else if subtitle}
				<Text variant="title" size="md" color="neutral">{subtitle}</Text>
			{/if}
		</Row>
	</Row>

	<Row justify="flex-end" gap="md">
		<Button variant="plain" color="neutral" size="sm" prefix="language">EN</Button>
		<Button variant="plain" color="neutral" size="sm" prefix="apps">Apps</Button>

		<Link href="/auth/signin">
			<Button variant="plain" color="neutral" size="sm">Sign in</Button>
		</Link>

		<Link href="/auth/signup">
			<Button variant="solid" color="primary" size="sm">Create account</Button>
		</Link>
	</Row>
</Row>

<style>
	:global(.WAuth-header) {
		background-color: var(--color-container);
		border-bottom: var(--line);
		height: 50px;
		margin-bottom: var(--space-xs);
		padding: var(--space-sm) var(--space-lg);
		z-index: 1;
	}
	:global(.WAuth-header__logo) {
		/* Corrects the logo's vertical alignment */
		margin-top: 4px;
	}
</style>
