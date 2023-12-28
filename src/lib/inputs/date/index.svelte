<script context="module" lang="ts">
  export interface DateInputProps extends BaseInputProps {
    value?: string;
    format?: string;
    defaultmonth?: string;
    defaultday?: string;
    defaultyear?: string;
  }
</script>

<script lang="ts">
	import { Row } from "$lib/layout";
  import BaseInput, { type BaseInputProps } from "../base/index.svelte";
  import Select from "../select/index.svelte";
	import { ValidationError } from "../_common_";
	import Option from "../select/option.svelte";
	import { onMount } from "svelte";

  type $$Props = DateInputProps;

  let day: string;
  let month: string;
  let year: string;

  export let id: $$Props['id'] = undefined;
  export let element: $$Props['element'] = undefined;
  export let format: $$Props['format'] = 'mm/dd/yyyy';
  export let error: $$Props['error'] = undefined;
  export let name: $$Props['name'] = undefined;
  export let required: $$Props['required'] = undefined;
  export let rules: $$Props['rules'] = undefined;
  export let validateon: $$Props['validateon'] = 'submit';
  export let value: $$Props['value'] = '';

  onMount(() => {
    if (required && !rules?.required) {
      rules = rules || {};
      rules.required = true;
    }

    if (rules && validateon === 'submit') {
      // Get the form element that this input is in
      const form = element?.closest('form');
      form?.addEventListener('submit', () => {
        validate();
      });
    }
  });

  function change(e: Event) {
    if (validateon === 'change' || error) {
      validate();
    }
  }

  function blur(e: Event) {
    if (validateon === 'blur') {
      validate();
    }
  }

  function validate() {
    if (day !== '' && month !== '' && year !== '') {
      const date = new Date(`${month}/${day}/${year}`);

      if (date.toString() !== 'Please enter a valid date') {
        _dipatch(date.toLocaleDateString('en-US'));
      } else {
        _dipatch('', new ValidationError('Please enter a valid date'));
      }
    } else {
      _dipatch('', new ValidationError('Please enter a valid date'));
    }
  }

  function _dipatch(_value: string, _error?: ValidationError) {
    value = _value;
    error = _error;
    element?.dispatchEvent(
      new Event('change', {
        bubbles: true,
      })
    );
  }
</script>

<Row justify="space-between" gap="nm" class="WuiInput__date">
  <Select
    placeholder="Month"
    {...$$restProps}
    {id}
    {required}
    {validateon}
    bind:value={month}
    bind:error={error}
    on:change={change}
    on:blur={blur}
  >
    <Option value="1">January</Option>
    <Option value="2">February</Option>
    <Option value="3">March</Option>
    <Option value="4">April</Option>
    <Option value="5">May</Option>
    <Option value="6">June</Option>
    <Option value="7">July</Option>
    <Option value="8">August</Option>
    <Option value="9">September</Option>
    <Option value="10">October</Option>
    <Option value="11">November</Option>
    <Option value="12">December</Option>
  </Select>

  <BaseInput
    type="number"
    placeholder="Day"
    masks={{max: 31}}
    {...$$restProps}
    maxlength={2}
    class="WuiInput__date__day"
    rules={{
      required: required ? 'Please enter a valid date' : undefined,
    }}
    {validateon}
    bind:value={day}
    bind:error={error}
    on:change={change}
    on:blur={blur}
  />

  <BaseInput
    type="number"
    placeholder="Year"
    {...$$restProps}
    maxlength={4}
    class="WuiInput__date__year"
    rules={{
      required: required ? 'Please enter a valid date' : undefined,
    }}
    {validateon}
    bind:value={year}
    bind:error={error}
    on:change={change}
    on:blur={blur}
  />

  <input
    bind:this={element}
    tabindex="-1"
    aria-hidden="true"
    {name}
    {value}
    style="clip:rect(1px, 1px, 1px, 1px);clip-path:inset(50%);height:1px;width:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;left:50%;bottom:0"
  />
</Row>

<style>
  :global(.WuiInput__date) {
    border-radius: inherit;
  }
  :global(.WuiInput__date__month, .WuiInput__date__day, .WuiInput__date__year) {
    width: 100%;
  }
  :global(.WuiInput__date__day, .WuiInput__date__year) {
    text-align: center;
    padding: 0;
  }
</style>