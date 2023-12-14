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

  type $$Props = DateInputProps;

  let day: string;
  let month: string;
  let year: string;

  export let element: $$Props['element'] = undefined;
  export let format: $$Props['format'] = 'mm/dd/yyyy';
  export let error: $$Props['error'] = undefined;
  export let required: $$Props['required'] = undefined;
  export let validateon: $$Props['validateon'] = 'blur';
  export let value: $$Props['value'] = '';

  function change(e: Event) {
    if (validateon === 'change') {
      validate();
    }
  }

  function blur(e: Event) {
    if (validateon === 'blur') {
      validate();
    }
  }

  function validate() {
    if (day !== '' && month && year !== '') {
      const date = new Date(`${month}/${day}/${year}`);

      if (date.toString() !== 'Please enter a valid date') {
        error = undefined;
        value = date.toLocaleDateString('en-US');

        element?.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              value
            },
          })
        );
      } else {
        error = new ValidationError('Invalid date');
        element?.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              value: '',
            },
          })
        );
      }
    }
  }
</script>

<Row bind:element={element} justify="space-between" gap="nm" class="WuiInput__date">
  <Select
    placeholder="Month"
    {...$$restProps}
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
      required: required ? 'Day is required' : undefined,
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
      required: required ? 'Year is required' : undefined,
    }}
    {validateon}
    bind:value={year}
    bind:error={error}
    on:change={change}
    on:blur={blur}
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