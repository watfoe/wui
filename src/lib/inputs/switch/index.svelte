<script lang="ts">
	interface $$props {
		checked?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
		element?: HTMLInputElement;
		name?: string;
		required?: boolean;
		size?: 'sm' | 'md' | 'lg';
	}

	const id = Math.random().toString(36);

	export let color: $$props['color'] = 'neutral';
	export let element: $$props['element'] = undefined;
	export let size: $$props['size'] = 'md';

	function change(e: Event) {
		e.target?.dispatchEvent(new Event('change', { bubbles: true }));
	}
</script>

<div class="WuiSwitch WuiSwitch--{size} WuiSwitch--{color}" on:*>
	<input
		bind:this={element}
		type="checkbox"
		class="WuiSwitch__input"
		{id}
		{...$$restProps}
		on:change={change}
	/>
	<label class="WuiSwitch__label" for={id} />
</div>

<style>
	.WuiSwitch {
		--WuiSwitch-color: var(--color-neutral);
		display: inline-block;
		position: relative;
	}

	.WuiSwitch--sm {
		--WuiSwitch-width: 28px;
		--WuiSwitch-height: 16px;
	}

	.WuiSwitch--md {
		--WuiSwitch-width: 34px;
		--WuiSwitch-height: 20px;
	}

	.WuiSwitch--lg {
		--WuiSwitch-width: 42px;
		--WuiSwitch-height: 24px;
	}

	.WuiSwitch__label {
		border: 1.3px solid var(--WuiSwitch-color);
		border-radius: calc(var(--WuiSwitch-height) / 2);
		cursor: pointer;
		display: block;
		height: var(--WuiSwitch-height);
		padding: 2px;
		width: var(--WuiSwitch-width);
	}

	.WuiSwitch--primary input:checked + .WuiSwitch__label,
	.WuiSwitch--neutral input:checked + .WuiSwitch__label {
		--WuiSwitch-color: var(--color-primary);
	}

	.WuiSwitch--success input:checked + .WuiSwitch__label {
		--WuiSwitch-color: var(--color-success);
	}

	.WuiSwitch--warning input:checked + .WuiSwitch__label {
		--WuiSwitch-color: var(--color-warning);
	}

	.WuiSwitch--danger input:checked + .WuiSwitch__label {
		--WuiSwitch-color: var(--color-error);
	}

	input:checked + .WuiSwitch__label::after {
		transform: translateX(calc(var(--WuiSwitch-width) - var(--WuiSwitch-height)));
	}

	.WuiSwitch__label::after {
		background-color: var(--WuiSwitch-color);
		border-radius: 50%;
		content: '';
		display: block;
		height: calc(var(--WuiSwitch-height) - 6px);
		width: calc(var(--WuiSwitch-height) - 6px);
		transition: transform 0.2s ease-in-out;
	}

	.WuiSwitch__input {
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		width: 1px;
		margin: -1px;
		overflow: hidden;
		padding: 0;
		position: absolute;
		left: 50%;
		bottom: 0;
	}
</style>
