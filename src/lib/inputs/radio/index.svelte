<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';

	interface $$props {
		checked?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
		element?: HTMLInputElement;
		label: string;
		name?: string;
		required?: boolean;
		value?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	const id = Math.random().toString(36).substring(2, 15);

	export let color: $$props['color'] = 'neutral';
	export let element: $$props['element'] = undefined;
	export let label: string;
	export let size: $$props['size'] = 'md';

	function change(e: Event) {
		e.target?.dispatchEvent(new Event('change', { bubbles: true }));
	}
</script>

<div class="WuiRadio WuiRadio--{size} WuiRadio--{color}">
	<input
		bind:this={element}
		type="radio"
		class="WuiRadio__input"
		{id}
		{...$$restProps}
		on:change={change}
	/>

	<Text
		variant="label"
		size="lg"
		color={color === 'neutral' ? 'black' : color}
		for={id}
		class="WuiRadio__label"
	>
		<span class="WuiRadio__thumb" />
		{label}
	</Text>
</div>
