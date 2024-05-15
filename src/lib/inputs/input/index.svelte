<script context="module" lang="ts">
	import type { BaseInputAttributes } from '../base/index.svelte';
	export type InputAttributes = Omit<BaseInputAttributes, 'id'> & {
		label?: Snippet | string;
		name?: string;
		description?: Snippet | string;
		hidden?: boolean;
		type?: 'date' | 'email' | 'name' | 'number' | 'password' | 'phone' | 'search' | 'text';
	};
</script>

<script lang="ts">
	import './style.css';
	import Label from '../label/index.svelte';
	import ErrorText from '../error/index.svelte';
	import BaseInput from '../base/index.svelte';
	import DateInput from '../date/index.svelte';
	import EmailInput from '../email/index.svelte';
	import PasswordInput from '../password/index.svelte';
	import PhoneInput from '../phone/index.svelte';
	import SearchInput from '../search/index.svelte';
	import type { Snippet } from 'svelte';
	import { Surface } from '$lib/utils';

	let {
		color = 'neutral',
		description,
		disabled,
		error = $bindable(),
		gap,
		hidden,
		justify,
		label,
		m,
		mx,
		my,
		mt,
		mr,
		mb,
		ml,
		type = 'text',
		value = $bindable(),
		variant = 'outlined',
		width = '100%',
		...rest
	}: InputAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Surface
	align="flex-start"
	element="fieldset"
	direction="column"
	class="WuiInput__root WuiInput--{color} {rest.class || ''}"
	{disabled}
	{gap}
	{justify}
	{m}
	{mx}
	{my}
	{mt}
	{mr}
	{mb}
	{ml}
	{hidden}
	{width}
>
	{#if label}
		<Label for={id} {color} {description}>{label}</Label>
	{/if}

	{#if type === 'date'}
		<DateInput {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{:else if type === 'email'}
		<EmailInput {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{:else if type === 'name'}
		<BaseInput
			{...rest}
			{disabled}
			{id}
			{color}
			{variant}
			autocomplete="name"
			autocapitalize="words"
			bind:error
			bind:value
		/>
	{:else if type === 'password'}
		<PasswordInput secure {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{:else if type === 'phone'}
		<PhoneInput {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{:else if type === 'search'}
		<SearchInput {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{:else}
		<BaseInput {...rest} {disabled} {id} {color} {variant} bind:error bind:value />
	{/if}

	{#if error}
		<ErrorText {error} />
	{/if}
</Surface>
