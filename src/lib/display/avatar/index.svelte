<script context="module" lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	export interface AvatarAttributes extends Omit<HTMLImgAttributes, 'height' | 'width'> {
		color?: WuiColor | string;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: Omit<WuiShape, 'pill'>;
	}
</script>

<script lang="ts">
	import './style.css';

	import { Col } from '$lib/layout';
	import { Text } from '$lib/typography';
	import { Icon } from '..';
	import { getContext } from 'svelte';

	let { color, alt, size, shape, variant, ...rest }: AvatarAttributes = $props();

	let ctx: {
		color?: WuiColor | string;
		size?: WuiSize;
		variant?: WuiVariant;
		shape?: Omit<WuiShape, 'pill'>;
	} = getContext('wui-avatar-group-ctx') || {};

	$effect.pre(() => {
		if (size === 'sm') {
			shape = 'circle';
		}
	});

	// TODO: Rethink this logic
	let isColorPreset = [
		'primary',
		'neutral',
		'success',
		'warning',
		'danger',
		'black',
		'white'
	].includes(color || ctx.color || '');
</script>

<Col
	role="img"
	aria-label={alt || 'Avatar'}
	align="center"
	justify="center"
	class="
	WuiAvatar
	WuiVariant-{variant || ctx.variant || 'solid'}
	WuiShape-{shape || ctx.shape || 'circle'}
	{isColorPreset ? `WuiColor-${color || ctx.color || 'primary'}` : ''}
	{rest.class || ''}"
	style="
		height:var(--height-{size || ctx.size || 'md'});
		width:var(--height-{size || ctx.size || 'md'});
		{isColorPreset ? '' : `--WuiAvatar-bg: ${color}`}
	"
>
	{#if rest.src}
		<img src={rest.src} {...rest} {alt} class="WuiAvatar__img" />
	{:else if alt}
		<Text variant="heading" color="inherit" {size}>{alt[0].toUpperCase()}</Text>
	{:else if !$$slots.default}
		<Icon color="inherit">person</Icon>
	{:else}
		<Text variant="heading" color="inherit" {size}><slot /></Text>
	{/if}
</Col>
