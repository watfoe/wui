<script lang="ts">
	import { Text } from '../text';
	import type { ValidationError } from '../input/_utils';

	let { error }: { error: ValidationError | string } = $props();

	function error_to_string(error: ValidationError | string) {
		if (typeof error === 'string') return error;

		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text color="danger" size="sm" ml="ss" style="line-height:1.2" variant="body">
	{error_to_string(error)}
</Text>
