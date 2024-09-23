<script lang="ts" module>
	export interface DividerAttributes extends Omit<SurfaceAttributes<'div'>, 'element' | 'size'> {
		size?: number;
		vertical?: boolean;
	}
</script>

<script lang="ts">
	import { Surface, type SurfaceAttributes } from '../surface';

	let {
		color = 'neutral',
		height,
		m,
		mx,
		my,
		size = 1,
		vertical = false,
		width,
		...rest
	}: DividerAttributes = $props();

	// Parent containers with no explicit height will not render the divider

	if (vertical) {
		height = height || '100%';
		width = width || size;
	} else {
		height = height || size;
		width = width || '100%';
	}
</script>

<Surface
	mx={vertical ? mx || m : undefined}
	my={vertical ? undefined : my || m}
	role="separator"
	variant="solid"
	{color}
	{height}
	{width}
	{...rest}
/>
