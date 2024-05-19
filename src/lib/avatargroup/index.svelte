<script>
	import Row from '../row';
	import { setContext } from 'svelte';

	/** @type {import('./index.js').AvatarGroupAttributes} */
	const { children, color, size, variant, shape } = $props();
	setContext('wui-avatar-group-ctx', { color, size, variant, shape });
</script>

<Row role="group" aria-label="Avatar Group" class="w-avatargroup" width="auto">
	{@render children()}
</Row>

<style>
	:global(.w-avatargroup > * + *) {
		box-shadow: 0 0 0 1px var(--color-surface) !important;
	}

	:global(.w-avatargroup > *:not(:first-child)) {
		margin-left: -3px;
		z-index: 1;
	}
</style>
