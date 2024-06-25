<script lang="ts" context="module">
	export interface PlaygroundAttributes extends RowAttributes {
		values?: {
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
	import { Col } from '$lib/col';
	import { List } from '$lib/list';
	import { ListButtonItem } from '$lib/listbuttonitem';
	import { Radio } from '$lib/radio';
	import { RadioGroup } from '$lib/radiogroup';
	import { Row, type RowAttributes } from '$lib/row';
	import { Switch } from '$lib/switch';
	import { Text } from '$lib/text';
	import { Tooltip } from '$lib/tooltip';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	let { values = $bindable(), children, ...rest }: PlaygroundAttributes = $props();

	const variants = ['solid', 'outlined', 'soft', 'plain', 'mixed'];
	const colors: WuiColor[] = ['primary', 'neutral', 'success', 'warning', 'danger', 'black'];
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
	const shapes = ['sharp', 'rounded', 'pill', 'circle'];
</script>

{#snippet listbuttonitem(
	category: 'variant' | 'color' | 'size' | 'shape',
	value: string,
	selected: string
)}
	<ListButtonItem
		px="md"
		size="xs"
		textsize="sm"
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
		gap="xl"
		p="xl"
		shape="rounded"
		width="100%"
		height="100%"
		variant="solid"
	>
		{#if children}
			{@render children()}
		{/if}
	</Col>

	{#if values}
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

			{#if values.variant}
				<Col align="flex-start" gap="sm" width="100%">
					<Text size="sm" bold>variant</Text>
					<List direction="row" gap="xs">
						{#each variants as variant}
							{@render listbuttonitem('variant', variant, values.variant!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.color}
				<Col align="flex-start" gap="sm" width="100%">
					<Text size="sm" bold>color</Text>
					<RadioGroup direction="row">
						{#each colors as color}
							<Tooltip title={color} {color} size="xs">
								<Radio
									indicator="check"
									name="color"
									value={color}
									size="md"
									variant="solid"
									{color}
									checked={values.color === color}
									onchange={() => (values.color = color)}
								/>
							</Tooltip>
						{/each}
					</RadioGroup>
				</Col>
			{/if}

			{#if values.size}
				<Col align="flex-start" gap="sm" width="100%">
					<Text size="sm" bold>size</Text>
					<List direction="row" gap="xs">
						{#each sizes as size}
							{@render listbuttonitem('size', size, values.size!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.shape}
				<Col align="flex-start" gap="sm" width="100%">
					<Text size="sm" bold>shape</Text>
					<List direction="row" gap="xs">
						{#each shapes as shape}
							{@render listbuttonitem('shape', shape, values.shape!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.disabled !== undefined}
				<Row justify="space-between" width="100%">
					<Text size="sm" bold>disabled</Text>
					<Switch size="sm" bind:checked={values.disabled} />
				</Row>
			{/if}

			{#if values.loading !== undefined}
				<Row justify="space-between" width="100%">
					<Text size="sm" bold>loading</Text>
					<Switch size="sm" bind:checked={values.loading} />
				</Row>
			{/if}
		</Col>
	{/if}
</Row>
