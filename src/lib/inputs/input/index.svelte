<script context="module" lang="ts">
	import type { BaseInputAttributes } from '../base/index.svelte';
	export type InputAttributes = Omit<BaseInputAttributes, 'id'> & {
		label?: string;
		name?: string;
		description?: string;
		hidden?: boolean;
		type?: 'date' | 'email' | 'name' | 'number' | 'password' | 'pin' | 'phone' | 'search' | 'text';
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
	import PinInput from '../pin/index.svelte';
	import SearchInput from '../search/index.svelte';

	let {
		color = 'neutral',
		description,
		disabled,
		error = $bindable(),
		label,
		hidden,
		type = 'text',
		value = $bindable(),
		...rest
	}: InputAttributes = $props();

	const id = Math.random().toString(36).substring(2, 15);
</script>

<fieldset class="WuiInput__root WuiInput--{color} {rest.class || ''}" {hidden} {disabled}>
	<!-- This might seem repetitive but with how the Label is defined, it ensures that it
  doesn't leave an unintended empty description helper text -->
	{#if label && $$slots.description && !hidden}
		<Label for={id} {description}>
			{label}
			<slot name="description" slot="description" />
		</Label>
	{:else if label && !hidden}
		<Label for={id} {description}>
			{label}
		</Label>
	{/if}

	{#if type === 'date'}
		<DateInput {...rest} {id} {color} bind:error bind:value />
	{:else if type === 'email'}
		<EmailInput {...rest} {id} {color} bind:error bind:value />
	{:else if type === 'name'}
		<BaseInput
			{...rest}
			{id}
			{color}
			autocomplete="name"
			autocapitalize="words"
			bind:error
			bind:value
		/>
	{:else if type === 'password'}
		<PasswordInput secure {...rest} {id} {color} bind:error bind:value />
	{:else if type === 'phone'}
		<PhoneInput {...rest} {id} {color} bind:error bind:value />
	{:else if type === 'pin'}
		<PinInput {...rest} {id} {color} bind:error bind:value />
	{:else if type === 'search'}
		<SearchInput {...rest} {id} {color} bind:error bind:value />
	{:else}
		<BaseInput {...rest} {id} {color} bind:error bind:value />
	{/if}

	{#if error}
		<ErrorText {error} />
	{/if}
</fieldset>
