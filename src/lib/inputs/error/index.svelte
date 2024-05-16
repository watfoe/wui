<script lang="ts">
	import Text from '$lib/typography/text/index.svelte';
	import type { ValidationError } from '../_common_';

	let { error }: { error: ValidationError | string } = $props();

	function error_to_string(error: ValidationError | string) {
		if (typeof error === 'string') return error;

		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text color="danger" size="xs" ml="ss" style="line-height:1.2" variant="body">
	{error_to_string(error)}
</Text>
