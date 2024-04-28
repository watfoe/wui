<script lang="ts">
	import { Text } from '$lib/typography';
	import type { ValidationError } from '../_common_';

	let { error }: { error: ValidationError } = $props();

	function error_to_string(error: ValidationError) {
		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text color="danger" size="xs" style="margin-left:var(--space-sm);line-height:1.2" variant="label">
	{error_to_string(error)}
</Text>
