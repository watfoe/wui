<script lang="ts">
	import Option from '../option.svelte';

	const { selected } = $props<{ selected?: string }>();
</script>

<Option value="female" selected={selected === 'female'}>Female</Option>
<Option value="male" selected={selected === 'male'}>Male</Option>
<Option value="custom" selected={selected === 'custom'}>Custom</Option>
