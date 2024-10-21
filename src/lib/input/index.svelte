<script lang="ts" module>
	export type InputAttributes = Omit<BaseInputAttributes, 'id'> & {
		label?: Snippet | string;
		name?: string;
		description?: Snippet | string;
		hidden?: boolean;
		type?: HTMLInputTypeAttribute | 'name';
	};
</script>

<script lang="ts">
	import './style.css';
	import { InputLabel } from '../inputlabel';
	import { InputError } from '../inputerror';
	import BaseInput from './_base.svelte';
	import DateInput from './_date.svelte';
	import EmailInput from './_email.svelte';
	import PasswordInput from './_password.svelte';
	import TelInput from './_tel.svelte';
	import SearchInput from './_search.svelte';
	import { Surface } from '../surface';
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import type { BaseInputAttributes } from './_utils';

	let {
		color = 'neutral',
		class: _class = '',
		description,
		disabled,
		error = $bindable(),
		gap = 3,
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
		size,
		type = 'text',
		value = $bindable(),
		variant = 'outlined',
		width = '100%',
		...rest
	}: InputAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<Surface
	items="start"
	element="fieldset"
	direction="column"
	class="w-input__root w-input--{color} {_class}"
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
		<InputLabel for={id} {color} {description} {size}>{label}</InputLabel>
	{/if}

	{#if type === 'date'}
		<DateInput {...rest} {disabled} {id} {color} {size} {variant} bind:error bind:value />
	{:else if type === 'email'}
		<EmailInput {...rest} {disabled} {id} {color} {size} {variant} bind:error bind:value />
	{:else if type === 'name'}
		<BaseInput
			{...rest}
			{disabled}
			{id}
			{color}
			{size}
			{variant}
			autocomplete="name"
			autocapitalize="words"
			bind:error
			bind:value
		/>
	{:else if type === 'password'}
		<PasswordInput
			secure
			{...rest}
			{disabled}
			{id}
			{color}
			{size}
			{variant}
			bind:error
			bind:value
		/>
	{:else if type === 'tel'}
		<TelInput {...rest} {disabled} {id} {color} {size} {variant} bind:error bind:value />
	{:else if type === 'search'}
		<SearchInput {...rest} {disabled} {id} {color} {size} {variant} bind:error bind:value />
	{:else}
		<BaseInput {...rest} {disabled} {id} {color} {size} {variant} bind:error bind:value />
	{/if}

	{#if error}
		<InputError {error} />
	{/if}
</Surface>
