<script lang="ts" module>
	export interface FlexAttributes extends Omit<SurfaceAttributes<'div'>, 'element'> {}
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '../surface';

	let { direction = 'row', ...rest }: FlexAttributes = $props();
</script>

<Surface element="div" {direction} {...rest} />
