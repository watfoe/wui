<script lang="ts">
	import './style.css';
	import { Button } from '$lib/buttons';
	import { Logo } from '$lib/display';
	import { Row } from '$lib/layout';
	import { LinkLikeButton, Text } from '$lib/typography';
	import type { FlexAttributes } from '../flex/index.svelte';

	interface WatfoeHeaderAttributes extends FlexAttributes {
		class?: string;
		subtitle?: string;
		urls?: {
			signin?: string;
			signup?: string;
		};
	}

	let { subtitle, urls, ...rest }: WatfoeHeaderAttributes = $props();
	urls = {
		signin: urls?.signin || 'https://auth.watfoe.com/signin',
		signup: urls?.signup || 'https://auth.watfoe.com/create-account'
	};
</script>

<Row justify="space-between" width="full" {...rest} class="WuiHeader {rest.class || ''}">
	<Row align="center" gap="md">
		<Logo size={60} class="WuiHeader__logo" />

		<Row align="center" gap="sm">
			<Text variant="heading" size="md" color="primary">Watfoe</Text>
			{#if $$slots.subtitle}
				<slot name="subtitle" />
			{:else if subtitle}
				<Text variant="heading" size="md" color="neutral">{subtitle}</Text>
			{/if}
		</Row>
	</Row>

	<Row justify="flex-end" gap="md">
		<Button variant="plain" color="neutral" size="sm" prefix="language">EN</Button>
		<Button variant="plain" color="neutral" size="sm" prefix="apps">Apps</Button>

		<LinkLikeButton href={urls?.signin} variant="plain" color="neutral" size="sm"
			>Sign in</LinkLikeButton
		>
		<LinkLikeButton href={urls?.signup} variant="solid" color="primary" size="sm">
			Create account
		</LinkLikeButton>
	</Row>
</Row>
