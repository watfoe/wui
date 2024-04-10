<script lang="ts">
	import Option, { type OptionAttributes } from '../option.svelte';
	interface GenderPresetAttributes {
		selected?: string;
	}

	const { selected }: GenderPresetAttributes = $props();
</script>

<Option value="female" selected={selected === 'female'} prefix="female">Female</Option>
<Option value="male" selected={selected === 'male'}>Male</Option>
<Option value="custom" selected={selected === 'custom'}>Custom</Option>
