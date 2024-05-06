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
	class="WuiHeader {_class}"
	height={50}
	justify="space-between"
	mb="xs"
	px="lg"
	py="sm"
	width="100%"
	{...rest}
>
	<Row align="center" gap="md">
		<Logo size={60} class="WuiHeader__logo" />

		<Row align="center" gap="sm">
			<Text color="primary" size="md" variant="heading">Watfoe</Text>
			{#if typeof subtitle === 'string'}
				<Text color="neutral" size="md" variant="heading">{subtitle}</Text>
			{:else if subtitle}
				{@render subtitle()}
			{/if}
		</Row>
	</Row>

	<Row justify="flex-end" gap="md">
		<Button color="black" fontsize="md" prefix="language" size="sm" variant="plain">EN</Button>
		<Button color="black" fontsize="md" prefix="apps" size="sm" variant="plain">Apps</Button>

		<LinkLikeButton href={urls?.signin} color="black" fontsize="md" size="sm" variant="plain">
			Sign in
		</LinkLikeButton>
		<LinkLikeButton href={urls?.signup} color="primary" fontsize="md" size="sm" variant="solid">
			Create account
		</LinkLikeButton>
	</Row>
</Row>
