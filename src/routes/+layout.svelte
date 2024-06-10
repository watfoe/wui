<script>
	import '$lib/styles/global.css';
	import './style.css';
	import { Col } from '$lib/col';
	import { WatfoeContent, WatfoeHeader } from '$lib/watfoe';
	import { Text } from '$lib/text';
	import { LinkLikeButton } from '$lib/linklikebutton';
	import { Surface } from '$lib/surface';

	const { children } = $props();

	const components = {
		INPUTS: [
			{ name: 'Button', path: '/components/button' },
			{ name: 'Checkbox', path: '/components/checkbox' },
			{ name: 'Form', path: '/components/form' },
			{ name: 'Input', path: '/components/input' },
			{ name: 'Listbox', path: '/components/listbox' },
			{ name: 'Radio', path: '/components/radio' },
			{ name: 'Select', path: '/components/select' },
			{ name: 'Switch', path: '/components/switch' },
			{ name: 'Textarea', path: '/components/textarea' }
		],
		DISPLAYS: [
			{ name: 'Avatar', path: '/components/avatar' },
			{ name: 'Badge', path: '/components/badge' },
			{ name: 'Chip', path: '/components/chip' },
			{ name: 'Divider', path: '/components/divider' },
			{ name: 'Icon', path: '/components/icon' },
			{ name: 'List', path: '/components/list' },
			{ name: 'Logo', path: '/components/logo' },
			{ name: 'Progress', path: '/components/progress' },
			{ name: 'Tooltip', path: '/components/tooltip' }
		],
		FEEDBACK: [
			{ name: 'Backdrop', path: '/components/backdrop' },
			{ name: 'Dialog', path: '/components/dialog' },
			{ name: 'Drawer', path: '/components/drawer' },
			{ name: 'Menu', path: '/components/menu' },
			{ name: 'Modal', path: '/components/modal' },
			{ name: 'Popup', path: '/components/popup' },
			{ name: 'Snackbar', path: '/components/snackbar' }
		],
		NAVIGATION: [
			{ name: 'Breadcrumb', path: '/components/breadcrumb' },
			{ name: 'Link', path: '/components/link' },
			{ name: 'Pagination', path: '/components/pagination' },
			{ name: 'Tabs', path: '/components/tabs' }
		],
		LAYOUT: [
			{ name: 'Col', path: '/components/col' },
			{ name: 'Flex', path: '/components/flex' },
			{ name: 'Row', path: '/components/row' }
		],
		UTILS: [
			{ name: 'LikeButton', path: '/components/likebutton' },
			{ name: 'Surface', path: '/components/surface' }
		],
		TYPOGRAPHY: [{ name: 'Text', path: '/components/text' }]
	};
</script>

<WatfoeHeader subtitle="Ui" />
<WatfoeContent direction="row" gap="xs" px={3} style="height:calc(100% - 50px)">
	<Surface
		element="nav"
		align="flex-start"
		color="neutral"
		direction="column"
		colorweight="0"
		height="100%"
		p="xs"
		pt="md"
		shape="rounded"
		variant="soft"
		width={300}
		style="overflow-y:auto"
	>
		<Text ml="md" bold>Getting started</Text>
		<LinkLikeButton
			color="neutral"
			href="/installation"
			justify="flex-start"
			pl="md"
			size="sm"
			variant="plain"
			width="100%"
		>
			Installation
		</LinkLikeButton>

		<!-- <Divider colorweight="2" my="sm" /> -->

		<Text ml="md" mt="md" bold>Components</Text>

		{#each Object.keys(components) as category}
			<Text color="neutral" colorweight="6" ml="md" mt="md" mb="xs" size="xs" bold>{category}</Text>
			{#each components[category] as component}
				<LinkLikeButton
					color="black"
					href={component.path}
					justify="flex-start"
					pl="md"
					size="sm"
					variant="plain"
					width="100%"
				>
					{component.name}
				</LinkLikeButton>
			{/each}
		{/each}
	</Surface>

	<Surface
		element="content"
		align="flex-start"
		color="neutral"
		colorweight="0"
		direction="column"
		height="100%"
		textcolor="black"
		width="100%"
		px="lg"
		pt="sm"
		shape="rounded"
		style="overflow-y:auto"
		variant="soft"
	>
		{@render children()}
	</Surface>
</WatfoeContent>
