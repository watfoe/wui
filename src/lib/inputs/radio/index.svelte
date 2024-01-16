<script lang="ts">
	import { Text } from '$lib/typography';

	interface $$props {
		checked?: boolean;
		class?: string;
		color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
		label: string;
		name?: string;
		required?: boolean;
		value?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	const id = Math.random().toString(36).substring(2, 15);

	export let color: $$props['color'] = 'neutral';
	export let label: string;
	export let size: $$props['size'] = 'md';
</script>

<div class="WuiRadio WuiRadio--{size} WuiRadio--{color}">
	<input type="radio" class="WuiRadio__input" {id} {...$$restProps} />

	<Text
		variant="label"
		size="lg"
		color={color === 'neutral' ? 'black' : color}
		for={id}
		class="WuiRadio__label"
	>
		<span class="WuiRadio__thumb">
			<span class="WuiRadio__thumb__indicator" />
		</span>
		{label}
	</Text>
</div>

<style>
	.WuiRadio {
		position: relative;
	}

	.WuiRadio--sm {
		--WuiRadio-size: 16px;
	}
	.WuiRadio--md {
		--WuiRadio-size: 20px;
	}
	.WuiRadio--lg {
		--WuiRadio-size: 24px;
	}

	.WuiRadio--primary {
		--WuiRadio-thumb-color: var(--color-primary);
	}
	.WuiRadio--neutral {
		--WuiRadio-thumb-color: var(--color-neutral);
	}
	.WuiRadio--neutral input:checked + :global(.WuiRadio__label) {
		--WuiRadio-thumb-color: var(--color-primary);
	}
	.WuiRadio--success {
		--WuiRadio-thumb-color: var(--color-success);
	}
	.WuiRadio--warning {
		--WuiRadio-thumb-color: var(--color-warning);
	}
	.WuiRadio--danger {
		--WuiRadio-thumb-color: var(--color-error);
	}

	:global(.WuiRadio__label) {
		--WuiRadio-thumb-indicator-display: none;
		align-items: center;
		cursor: pointer;
		position: relative;
		display: inline-flex;
		flex-direction: row;
		gap: var(--space-nm);
	}

	input:checked + :global(.WuiRadio__label) {
		--WuiRadio-thumb-indicator-display: block;
	}

	.WuiRadio__thumb {
		border: 1px solid var(--WuiRadio-thumb-color);
		border-radius: 17px;
		cursor: pointer;
		display: inline-block;
		height: var(--WuiRadio-size);
		width: var(--WuiRadio-size);
		padding: 2px;
	}

	.WuiRadio__thumb__indicator {
		background-color: var(--WuiRadio-thumb-color);
		border-radius: 50%;
		display: var(--WuiRadio-thumb-indicator-display) !important;
		height: 100%;
		width: 100%;
		transition: transform 0.2s ease-in-out;
	}

	.WuiRadio__input {
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
