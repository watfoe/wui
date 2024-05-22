<script lang="ts">
	import { Button } from '../button';
	import { Logo } from '../logo';
	import { Row } from '../row';
	import { LinkLikeButton } from '../linklikebutton';
	import { Text } from '../text';
	import type { FlexAttributes } from '../flex';
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
	class="watfoe-header {_class}"
	height={50}
	justify="space-between"
	mb="xs"
	px="lg"
	py="sm"
	width="100%"
	{...rest}
>
	<Row align="center" gap="md">
		<Logo size={50} />

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
		<Button color="black" textsize="md" prefix="apps" size="sm" variant="plain">Apps</Button>
		<LinkLikeButton href={urls?.signin} color="black" textsize="md" size="sm" variant="plain">
			Sign in
		</LinkLikeButton>
		<LinkLikeButton href={urls?.signup} color="primary" textsize="md" size="sm" variant="solid">
			Create account
		</LinkLikeButton>
	</Row>
</Row>

<style>
	:global(.watfoe-header) {
		background-color: var(--color-surface);
		position: fixed;
		top: 0;
		z-index: 9999;
	}
</style>
