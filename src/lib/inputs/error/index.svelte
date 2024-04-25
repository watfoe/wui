<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';
	import type { ValidationError } from '../_common_';

	let { error }: { error: ValidationError } = $props();

	function errorToString(error: ValidationError) {
		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text color="danger" class="WuiInput__error" size="sm" variant="label" style="line-height:1">
	{errorToString(error)}
</Text>
