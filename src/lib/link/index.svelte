<script lang="ts" module>
	export type LinkAttributes = BaseTextAttributes<'a'> & {};
</script>

<script lang="ts">
	import { Text, type BaseTextAttributes } from '../text';

	let { color = 'primary', underline = false, ...rest }: LinkAttributes = $props();
</script>

<Text {color} {underline} variant="a" {...rest} />
