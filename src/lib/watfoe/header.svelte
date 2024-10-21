<script lang="ts">
	import { Logo } from '../logo';
	import { Row } from '../row';
	import { LinkLikeButton } from '../linklikebutton';
	import { Text } from '../text';
	import type { Snippet } from 'svelte';
	import { Surface, type SurfaceAttributes } from '$lib/surface';
	import { Input } from '$lib/input';
	import { Button } from '$lib/button';
	import { Tooltip } from '$lib/tooltip';

	interface WatfoeHeaderAttributes extends SurfaceAttributes<'header'> {
		subtitle?: Snippet | string;
		urls?: {
			login?: string;
			signup?: string;
		};
	}

	let { class: _class = '', subtitle, urls, ...rest }: WatfoeHeaderAttributes = $props();
	urls = {
		login: urls?.login || 'https://auth.watfoe.com/login',
		signup: urls?.signup || 'https://auth.watfoe.com/create-account'
	};
</script>

<Surface
	element="header"
	class="watfoe-header {_class}"
	direction="row"
	height={70}
	justify="between"
	mb="xs"
	pl="lg"
	pr="md"
	pb={10}
	width="100%"
	{...rest}
>
	<Row items="center" gap="md">
		<Logo size={50} />

		<Row items="center" gap="sm">
			<Text color="black" size="lg" variant="heading">Watfoe</Text>
			{#if typeof subtitle === 'string'}
				<Text color="neutral" size="lg" variant="heading">{subtitle}</Text>
			{:else if subtitle}
				{@render subtitle()}
			{/if}
		</Row>
	</Row>

	<Input
		type="search"
		variant="soft"
		shape="pill"
		textsize="md"
		width={500}
		class="watfoe-header__search"
	/>

	<Row justify="end" gap="sm">
		<Tooltip title="Watfoe Apps" size="xs">
			<Button color="black" shape="pill" variant="plain" prefix="apps" />
		</Tooltip>
		<LinkLikeButton href={urls?.login} color="black" shape="pill" px="lg">Log in</LinkLikeButton>
	</Row>
</Surface>

<style>
	:global(.watfoe-header) {
		background-color: var(--color-surface);
		position: fixed;
		top: 0;
		z-index: 9999;
	}

	:global(.watfoe-header__search) {
		position: absolute;
		left: 50%;
		translate: -50%;
	}
</style>
