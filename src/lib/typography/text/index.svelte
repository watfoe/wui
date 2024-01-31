<script lang="ts">
	import { onMount } from 'svelte';

	interface $$Props {
		bold?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning' | 'black' | 'white';
		italic?: boolean;
		rtl?: boolean;
		size?: 'sm' | 'md' | 'lg';
		style?: string;
		underline?: boolean;
		variant?: 'headline' | 'title' | 'body' | 'label' | 'code';
	}

	export let bold: $$Props['bold'] = false;
	export let color: $$Props['color'] = 'black';
	export let italic: $$Props['italic'] = false;
	export let rtl: $$Props['rtl'] = false;
	export let size: $$Props['size'] = 'md';
	export let underline: $$Props['underline'] = false;
	export let variant: $$Props['variant'] = 'body';

	let _class: $$Props['class'] = '';
	export { _class as class };

	const elements = {
		headline: {
			sm: 'h3',
			md: 'h2',
			lg: 'h1'
		},
		title: {
			sm: 'h6',
			md: 'h5',
			lg: 'h4'
		},
		body: {
			sm: 'span',
			md: 'span',
			lg: 'span'
		},
		label: {
			sm: 'label',
			md: 'label',
			lg: 'label'
		},
		code: {
			sm: 'code',
			md: 'code',
			lg: 'code'
		}
	};

	onMount(() => {
		if (variant === 'headline' || variant === 'title') {
			bold = true;
		}
	});
</script>

<svelte:element
	this={elements[variant || 'body'][size || 'md']}
	class="WuiText WuiText--{variant} WuiText--{size} WuiText--{color} {bold
		? 'WuiText--bold'
		: ''} {italic ? 'WuiText--italic' : ''} {rtl ? 'WuiText--rtl' : ''} {underline
		? 'WuiText--underline'
		: ''} {_class}"
	style={$$restProps.style || ''}
	{...$$restProps}
>
	<slot />
</svelte:element>

<style>
	.WuiText {
		color: var(--WuiText-color, var(--color-black));
		font-size: var(--WuiText-font-size, 1rem);
		font-weight: 350;
		line-height: var(--WuiText-line-height, 1.5rem);
	}

	.WuiText--primary {
		--WuiText-color: var(--color-primary);
	}
	.WuiText--neutral {
		--WuiText-color: var(--color-black-1);
	}
	.WuiText--success {
		--WuiText-color: var(--color-success);
	}
	.WuiText--warning {
		--WuiText-color: var(--color-warning);
	}
	.WuiText--danger {
		--WuiText-color: var(--color-error);
	}
	.WuiText--black {
		--WuiText-color: var(--color-black);
	}
	.WuiText--white {
		--WuiText-color: var(--color-white);
	}

	.WuiText--headline.WuiText--sm {
		--WuiText-font-size: 1.5rem;
		--WuiText-line-height: 2rem;
	}
	.WuiText--headline.WuiText--md {
		--WuiText-font-size: 1.75rem;
		--WuiText-line-height: 2.25rem;
	}
	.WuiText--headline.WuiText--lg {
		--WuiText-font-size: 2rem;
		--WuiText-line-height: 2.5rem;
	}

	.WuiText--title.WuiText--sm {
		--WuiText-font-size: 1rem;
		--WuiText-line-height: 1.25rem;
	}
	.WuiText--title.WuiText--md {
		--WuiText-font-size: 1.125rem;
		--WuiText-line-height: 1.5rem;
	}
	.WuiText--title.WuiText--lg {
		--WuiText-font-size: 1.25rem;
		--WuiText-line-height: 1.75rem;
	}

	.WuiText--body.WuiText--sm,
	.WuiText--label.WuiText--sm {
		--WuiText-font-size: 0.75rem;
		--WuiText-line-height: 0.875rem;
	}
	.WuiText--body.WuiText--md,
	.WuiText--label.WuiText--md {
		--WuiText-font-size: 0.8125rem;
		--WuiText-line-height: 1rem;
	}
	.WuiText--body.WuiText--lg,
	.WuiText--label.WuiText--lg {
		--WuiText-font-size: 0.9375rem;
		--WuiText-line-height: 1.125rem;
	}

	.WuiText--label.WuiText--sm {
		--WuiText-font-size: 0.6875rem;
		--WuiText-line-height: 0.8125rem;
	}
	.WuiText--label.WuiText--md {
		--WuiText-font-size: 0.75rem;
		--WuiText-line-height: 0.875rem;
	}
	.WuiText--label.WuiText--lg {
		--WuiText-font-size: 0.8125rem;
		--WuiText-line-height: 0.9375rem;
	}

	.WuiText--code.WuiText--sm {
		--WuiText-font-size: 0.75rem;
		--WuiText-line-height: 1rem;
	}
	.WuiText--code.WuiText--md {
		--WuiText-font-size: 0.875rem;
		--WuiText-line-height: 1.25rem;
	}
	.WuiText--code.WuiText--lg {
		--WuiText-font-size: 1rem;
		--WuiText-line-height: 1.5rem;
	}

	.WuiText--bold {
		font-weight: 450;
	}

	.WuiText--italic {
		font-style: italic;
	}

	.WuiText--rtl {
		direction: rtl;
	}

	.WuiText--underline {
		text-decoration: underline;
	}
</style>
