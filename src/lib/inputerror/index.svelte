<script lang="ts" module>
	export interface InputErrorAttributes extends BaseTextAttributes<'span'> {
		error: ValidationError | string;
	}
</script>

<script lang="ts">
	import { Text, type BaseTextAttributes } from '../text';
	import type { ValidationError } from '../input/_utils';

	let { error, children, ...rest }: InputErrorAttributes = $props();

	function error_to_string(error: ValidationError | string) {
		if (typeof error === 'string') return error;

		let message = error.message.replace(/_/g, ' ').toLocaleLowerCase();
		message = message.charAt(0).toUpperCase() + message.slice(1);
		return message;
	}
</script>

<Text color="error" class="w-input__error" size="sm" px={3} variant="body" {...rest}>
	{error_to_string(error)}
</Text>
