<script lang="ts" module>
	export interface PlaygroundAttributes extends RowAttributes {
		values?: {
			variant?: WuiVariant;
			color?: WuiColor;
			size?: WuiSize;
			shape?: WuiShape;
			disabled?: boolean;
			loading?: boolean;
			label?: string;
			position?:
				| 'left-start'
				| 'top-start'
				| 'top'
				| 'top-end'
				| 'right-start'
				| 'left'
				| 'right'
				| 'left-end'
				| 'bottom-start'
				| 'bottom'
				| 'bottom-end'
				| 'right-end';
		};
	}
</script>

<script lang="ts">
	import { Button } from '$lib/button';

	import { Col } from '$lib/col';
	import { Input } from '$lib/input';
	import { List } from '$lib/list';
	import { ListButtonItem } from '$lib/listbuttonitem';
	import { type MenuAttributes } from '$lib/menu';
	import { Radio } from '$lib/radio';
	import { RadioGroup } from '$lib/radiogroup';
	import { Row, type RowAttributes } from '$lib/row';
	import { Switch } from '$lib/switch';
	import { Text } from '$lib/text';
	import { Tooltip } from '$lib/tooltip';
	import type { WuiColor, WuiShape, WuiSize, WuiVariant } from '$lib/types';

	let { values = $bindable(), children, ...rest }: PlaygroundAttributes = $props();

	const variants = ['solid', 'outlined', 'soft', 'plain', 'mixed'];
	const colors: WuiColor[] = ['primary', 'neutral', 'success', 'warning', 'error', 'black'];
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
	const shapes = ['sharp', 'rounded', 'pill', 'circle'];

	const positions = [
		['left-start', 'top-start', 'top', 'top-end', 'right-start'],
		['left', 'right'],
		['left-end', 'bottom-start', 'bottom', 'bottom-end', 'right-end']
	];
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
			align="start"
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
				<Col align="start" gap="sm" width="100%">
					<Text size="sm" bold>Variant</Text>
					<List direction="row" gap="xs">
						{#each variants as variant}
							{@render listbuttonitem('variant', variant, values.variant!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.color}
				<Col align="start" gap="sm" width="100%">
					<Text size="sm" bold>Color</Text>
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
				<Col align="start" gap="sm" width="100%">
					<Text size="sm" bold>Size</Text>
					<List direction="row" gap="xs">
						{#each sizes as size}
							{@render listbuttonitem('size', size, values.size!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.shape}
				<Col align="start" gap="sm" width="100%">
					<Text size="sm" bold>Shape</Text>
					<List direction="row" gap="xs">
						{#each shapes as shape}
							{@render listbuttonitem('shape', shape, values.shape!)}
						{/each}
					</List>
				</Col>
			{/if}

			{#if values.disabled !== undefined}
				<Row justify="between" width="100%">
					<Text size="sm" bold>Disabled</Text>
					<Switch size="sm" bind:checked={values.disabled} />
				</Row>
			{/if}

			{#if values.loading !== undefined}
				<Row justify="between" width="100%">
					<Text size="sm" bold>Loading</Text>
					<Switch size="sm" bind:checked={values.loading} />
				</Row>
			{/if}

			{#if values.position}
				<Col align="center" justify="center" gap="sm" width="450px">
					<Text align="left" size="sm" width="100%" bold>Position</Text>
					{#each positions as row}
						<Row justify="between" width="100%">
							{#each row as position}
								<Button
									color={position === values?.position ? 'primary' : 'neutral'}
									size="xs"
									variant={position === values?.position ? 'solid' : 'outlined'}
									width="86px"
									onclick={() => (values.position = position as MenuAttributes['position'])}
								>
									{position}
								</Button>
							{/each}
						</Row>
					{/each}
				</Col>
			{/if}

			{#if values.label}
				<Input bind:value={values.label} label="Label" size="xs" />
			{/if}
		</Col>
	{/if}
</Row>
