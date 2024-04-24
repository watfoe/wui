<script lang="ts">
	import './style.css';
	import { Button } from '$lib/buttons';
	import { Logo } from '$lib/display';
	import { Row } from '$lib/layout';
	import { LinkLikeButton, Text } from '$lib/typography';
	import type { FlexAttributes } from '../flex/index.svelte';
	import type { Snippet } from 'svelte';

	interface WatfoeHeaderAttributes extends FlexAttributes {
		class?: string;
		subtitle?: Snippet | string;
		urls?: {
			signin?: string;
			signup?: string;
		};
	}

	let { class: _class = '', subtitle, urls, ...rest }: WatfoeHeaderAttributes = $props();
	urls = {
		signin: urls?.signin || 'https://auth.watfoe.com/signin',
		signup: urls?.signup || 'https://auth.watfoe.com/create-account'
	};
</script>

<Row
	justify="space-between"
	px="lg"
	py="sm"
	mb="xs"
	width="100%"
	height={50}
	class="WuiHeader {_class}"
	{...rest}
>
	<Row align="center" gap="md">
		<Logo size={60} class="WuiHeader__logo" />

		<Row align="center" gap="sm">
			<Text color="primary" size="md" variant="heading" weight="400">Watfoe</Text>
			{#if typeof subtitle === 'string'}
				<Text color="neutral" size="md" variant="heading" weight="400">{subtitle}</Text>
			{:else if subtitle}
				{@render subtitle()}
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
