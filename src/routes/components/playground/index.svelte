<script lang="ts" context="module">
	export interface PlaygroundAttributes extends RowAttributes {
		values: {
			variant?: WuiVariant;
			color?: WuiColor;
			size?: WuiSize;
			shape?: WuiShape;
			disabled?: boolean;
			loading?: boolean;
		};
	}
</script>

<script lang="ts">
	import { Checkbox } from '$lib/checkbox';
	import { CheckboxGroup } from '$lib/checkboxgroup';
	import { Col } from '$lib/col';
	import { List } from '$lib/list';
	import { ListButtonItem } from '$lib/listbuttonitem';
	import { Row, type RowAttributes } from '$lib/row';
	import { Switch } from '$lib/switch';
	import { Text } from '$lib/text';
	import { Tooltip } from '$lib/tooltip';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	let { values = $bindable({}), children, ...rest }: PlaygroundAttributes = $props();

	const variants = ['solid', 'outlined', 'soft', 'plain'];
	const colors: WuiColor[] = ['primary', 'neutral', 'success', 'warning', 'danger', 'black'];
	const sizes = ['ss', 'xs', 'sm', 'md', 'lg', 'xl', 'xx'];
	const shapes = ['sharp', 'rounded', 'pill', 'circle'];
</script>

{#snippet listbuttonitem(category: 'variant' | 'color' | 'size' | 'shape', value: string, selected: string)}
	<ListButtonItem
		px="md"
		size="ss"
		variant={value === selected ? 'solid' : 'outlined'}
		color={value === selected ? 'primary' : 'neutral'}
		shape="pill"
		onclick={() => {
			/** @ts-ignore */
			values[category] = value;
		}}
	>
		{value}
	</ListButtonItem>
{/snippet}

<Row color="neutral" shape="rounded" variant="outlined" width="100%" {...rest}>
	<Col
		align="center"
		color="white"
		justify="center"
		shape="rounded"
		width="100%"
		height="100%"
		variant="solid"
	>
		{#if children}
			{@render children()}
		{/if}
	</Col>

	<Col
		align="flex-start"
		color="primary"
		colorweight="0"
		textcolor="black"
		gap="lg"
		shape="rounded"
		variant="soft"
		p="md"
	>
		<Text variant="heading" size="sm">Playground</Text>
		<Col align="flex-start" gap="sm" width="100%">
			<Text size="sm" bold>variant</Text>
			<List direction="row" gap="xs">
				{#each variants as variant}
					{@render listbuttonitem('variant', variant, values.variant!)}
				{/each}
			</List>
		</Col>

		<Col align="flex-start" gap="sm" width="100%">
			<Text size="sm" bold>color</Text>
			<CheckboxGroup direction="row">
				{#each colors as color}
					<Tooltip title={color} {color} size="xs">
						<Checkbox
							shape="circle"
							variant="solid"
							size="md"
							{color}
							checked={values.color === color}
						/>
					</Tooltip>
				{/each}
			</CheckboxGroup>
		</Col>

		<Col align="flex-start" gap="sm" width="100%">
			<Text size="sm" bold>size</Text>
			<List direction="row" gap="xs">
				{#each sizes as size}
					{@render listbuttonitem('size', size, values.size!)}
				{/each}
			</List>
		</Col>

		<Col align="flex-start" gap="sm" width="100%">
			<Text size="sm" bold>shape</Text>
			<List direction="row" gap="xs">
				{#each shapes as shape}
					{@render listbuttonitem('shape', shape, values.shape!)}
				{/each}
			</List>
		</Col>

		<Row justify="space-between" width="100%">
			<Text size="sm" bold>disabled</Text>
			<Switch size="sm" bind:checked={values.disabled} />
		</Row>

		<Row justify="space-between" width="100%">
			<Text size="sm" bold>loading</Text>
			<Switch size="sm" bind:checked={values.loading} />
		</Row>
	</Col>
</Row>
