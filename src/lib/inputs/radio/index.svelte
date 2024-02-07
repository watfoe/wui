<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';

	interface RadioAttributes {
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

	let { color = 'neutral', element, label, size = 'md', ...rest } = $props<RadioAttributes>();

	const id = Math.random().toString(36).substring(2, 15);

	function change(e: Event) {
		e.target?.dispatchEvent(new Event('change', { bubbles: true }));
	}
</script>

<div class="WuiRadio WuiRadio--{size} WuiRadio--{color}">
	<input
		{...rest}
		bind:this={element}
		type="radio"
		class="WuiRadio__input"
		{id}
		onchange={change}
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
