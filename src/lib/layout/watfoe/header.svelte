<script lang="ts">
	import './style.css';
	import { Button, ButtonLink } from '$lib/buttons';
	import { Logo } from '$lib/display';
	import { Row } from '$lib/layout';
	import { Text } from '$lib/typography';
	import type { FlexAttributes } from '../flex/index.svelte';

	import { env } from '$env/dynamic/public';

	interface WatfoeHeaderAttributes extends FlexAttributes {
		class?: string;
		subtitle?: string;
		urls?: {
			signin?: string;
			signup?: string;
		};
	}

	let { subtitle, urls, ...rest } = $props<WatfoeHeaderAttributes>();
	urls = {
		signin: urls?.signin || env.WATFOE_SIGNIN_URL || 'https://auth.watfoe.com/signin',
		signup: urls?.signup || env.WATFOE_SIGNUP_URL || 'https://auth.watfoe.com/create-account'
	};
</script>

<Row justify="space-between" width="full" {...rest} class="WAuth-header {rest.class || ''}">
	<Row align="center" gap="md">
		<Logo size={60} class="WAuth-header__logo" />

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

		<ButtonLink href={urls?.signin} variant="plain" color="neutral" size="sm">Sign in</ButtonLink>
		<ButtonLink href={urls?.signup} variant="solid" color="primary" size="sm">
			Create account
		</ButtonLink>
	</Row>
</Row>
