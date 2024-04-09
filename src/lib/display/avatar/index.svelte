<script context="module" lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	export interface AvatarAttributes extends Omit<HTMLImgAttributes, 'height' | 'width'> {
		color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger' | string;
		size?: 'sm' | 'md' | 'lg';
		variant?: 'solid' | 'outline' | 'soft' | 'plain';
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col } from '$lib/layout';
	import { Text } from '$lib/typography';
	import { Icon } from '..';

	let {
		color = 'primary',
		alt,
		size = 'md',
		variant = 'solid',
		...rest
	}: AvatarAttributes = $props();

	// TODO: Rethink this logic
	let isColorPreset = ['primary', 'neutral', 'success', 'warning', 'danger'].includes(color!);
</script>

<Col
	role="img"
	aria-label={alt || 'Avatar'}
	align="center"
	justify="center"
	class="WuiAvatar WuiAvatar--{size} WuiAvatar--{variant} {isColorPreset
		? `WuiAvatar--${color}`
		: ''} {rest.class || ''}"
	style={isColorPreset ? '' : `--WuiAvatar-bg: ${color}`}
>
	{#if rest.src}
		<img src={rest.src} {...rest} {alt} class="WuiAvatar__img" />
	{:else if alt}
		<Text variant="heading" {size}>{alt[0].toUpperCase()}</Text>
	{:else if !$$slots.default}
		<Icon>person</Icon>
	{:else}
		<Text variant="heading" {size}><slot /></Text>
	{/if}
</Col>
