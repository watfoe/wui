<script context="module" lang="ts">
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
	import { InputLabel } from '../inputlabel';
	import { InputError } from '../inputerror';
	import BaseInput, { type BaseInputAttributes } from './_base.svelte';
	import DateInput from './_date.svelte';
	import EmailInput from './_email.svelte';
	import PasswordInput from './_password.svelte';
	import PhoneInput from './_phone.svelte';
	import SearchInput from './_search.svelte';
	import { Surface } from '../surface';
	import type { Snippet } from 'svelte';

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
	element="div"
	direction="column"
	class="w-input__root w-input--{color} {rest.class || ''}"
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
		<InputLabel for={id} {color} {description}>{label}</InputLabel>
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
		<InputError {error} />
	{/if}
</Surface>
