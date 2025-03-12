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
	import { Icon } from '$lib/icon';
	import type { WuiColor } from '$lib/types';

	interface WatfoeHeaderAttributes extends SurfaceAttributes<'header'> {
		subtitle?: Snippet | string;
		subtitlecolor?: WuiColor;
		urls?: {
			login?: string;
			signup?: string;
		};
		hidesearch?: boolean;
	}

	let {
		class: _class = '',
		subtitle,
		subtitlecolor = 'neutral',
		urls,
		hidesearch = false,
		...rest
	}: WatfoeHeaderAttributes = $props();
	urls = {
		login: urls?.login || 'https://auth.watfoe.com/login',
		signup: urls?.signup || 'https://auth.watfoe.com/create-account'
	};
</script>

<Surface
	element="header"
	variant="soft"
	color="neutral"
	colorweight="0"
	class="watfoe-header {_class}"
	direction="row"
	height={80}
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
				<Text color={subtitlecolor} size="lg" variant="heading">{subtitle}</Text>
			{:else if subtitle}
				{@render subtitle()}
			{/if}
		</Row>
	</Row>

	{#if !hidesearch}
		<Input
			type="search"
			color="neutral"
			colorweight="2"
			variant="outlined"
			textsize="md"
			width={600}
			class="watfoe-header__search"
		/>
	{/if}

	<Row justify="end" gap="md">
		<Tooltip title="Watfoe Apps" size="xs">
			<Button color="black" shape="circle" variant="plain">
				{#snippet prefix()}
					<Icon size="lg">apps</Icon>
				{/snippet}
			</Button>
		</Tooltip>
		<LinkLikeButton href={urls?.login} color="black" shape="pill" px="lg">Log in</LinkLikeButton>
	</Row>
</Surface>

<style>
	:global(.watfoe-header) {
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
