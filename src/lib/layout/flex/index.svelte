<script context="module" lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	export interface FlexKeys {
		_this?: HTMLDivElement;
		align?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
		justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
		gap?: 'xs' | 'sm' | 'nm' | 'md' | 'lg';
		height?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
		wrap?: 'wrap' | 'nowrap';
		width?: 'full' | 'half' | 'third' | 'quarter' | 'auto' | 'inherit';
	}

	export interface FlexAttributes extends HTMLAttributes<HTMLDivElement>, FlexKeys {}
</script>

<script lang="ts">
	let {
		_this = $bindable<HTMLDivElement>(),
		direction = 'row',
		justify = 'flex-start',
		align = 'center',
		wrap = 'nowrap',
		gap,
		width,
		height,
		...rest
	}: FlexAttributes = $props();
</script>

<div
	{...rest}
	class="WuiFlex {gap ? 'WuiFlex--gap-' + gap : ''} {width ? 'WuiFlex--width-' + width : ''} {height
		? 'WuiFlex--height-' + height
		: ''} {rest.class || ''}"
	style="
    {rest.style || ''};
    --WuiFlex-direction:{direction};
    --WuiFlex-justify:{justify};
    --WuiFlex-align:{align};
    --WuiFlex-wrap:{wrap};
  "
	bind:this={_this}
>
	<slot />
</div>

<style>
	.WuiFlex {
		display: flex;
		flex-direction: var(--WuiFlex-direction, row);
		justify-content: var(--WuiFlex-justify, flex-start);
		align-items: var(--WuiFlex-align, flex-start);
		flex-wrap: var(--WuiFlex-wrap, nowrap);
	}
	.WuiFlex--gap-xs {
		gap: var(--space-xs);
	}
	.WuiFlex--gap-sm {
		gap: var(--space-sm);
	}
	.WuiFlex--gap-nm {
		gap: var(--space-nm);
	}
	.WuiFlex--gap-md {
		gap: var(--space-md);
	}
	.WuiFlex--gap-lg {
		gap: var(--space-lg);
	}

	.WuiFlex--width-full {
		width: 100%;
	}
	.WuiFlex--width-half {
		width: 50%;
	}
	.WuiFlex--width-third {
		width: 33.333333%;
	}
	.WuiFlex--width-quarter {
		width: 25%;
	}
	.WuiFlex--width-auto {
		width: auto;
	}
	.WuiFlex--width-inherit {
		width: inherit;
	}

	.WuiFlex--height-full {
		height: 100%;
	}
	.WuiFlex--height-half {
		height: 50%;
	}
	.WuiFlex--height-third {
		height: 33.333333%;
	}
	.WuiFlex--height-quarter {
		height: 25%;
	}
	.WuiFlex--height-auto {
		height: auto;
	}
	.WuiFlex--height-inherit {
		height: inherit;
	}
</style>
