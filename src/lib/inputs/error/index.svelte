<script lang="ts">
	import './style.css';
	import { Text } from '$lib/typography';
	import type { ValidationError } from '../_common_';
	export let error: ValidationError;

	function errorToString(error: ValidationError) {
		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text variant="label" size="sm" color="danger" class="WuiInput__error">
	{errorToString(error)}
</Text>
