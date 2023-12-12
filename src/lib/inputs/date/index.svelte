<script lang="ts">
	import { Row } from "$lib/layout";
  import BaseInput, { type BaseInputProps } from "../base/index.svelte";
  import Select from "../select/index.svelte";
	import type { ValidationError } from "../_common_";
	import Option from "../select/option.svelte";

  type $$Props = BaseInputProps;

  let dayInput: BaseInput;
  let monthInput: BaseInput;
  let yearInput: BaseInput;

  const dateOnValid = (value: string | ValidationError) => {
    if (typeof value === 'string') {
      const dayNumber = Number(value);
      if (value.length === 2 || dayNumber > 3) {
        dayInput.blur();
        monthInput.focus();
      }
    }
  }
  const monthOnValid = (value: string | ValidationError) => {
    if (typeof value === 'string') {
      const monthNumber = Number(value);
      if (value.length === 2 || monthNumber > 1) {
        monthInput.blur();
        yearInput.focus();
      }
    }
  }

  //     setError: (error: ValidationError) => {
  //       dayInputRef.current?.setError(error);
  //       monthInputRef.current?.setError(error);
  //       yearInputRef.current?.setError(error);
  //       onValidate?.(error);
  //     },
  //     clearError: () => {
  //       dayInputRef.current?.clearError();
  //       monthInputRef.current?.clearError();
  //       yearInputRef.current?.clearError();
  //     },
  //     getError: () => {
  //       const dayError = dayInputRef.current?.getError();
  //       const monthError = monthInputRef.current?.getError();
  //       const yearError = yearInputRef.current?.getError();

  //       if (dayError) {
  //         return dayError;
  //       } else if (monthError) {
  //         return monthError;
  //       } else if (yearError) {
  //         return yearError;
  //       } else {
  //         return null;
  //       }
  //     },
  //     getValue: () => {
  //       const day = dayInputRef.current?.getValue();
  //       const month = monthInputRef.current?.getValue();
  //       const year = yearInputRef.current?.getValue();

  //       if (day && month && year) {
  //         return {
  //           day,
  //           month,
  //           year,
  //         };
  //       }

  //       return '';
  //     },
  //     setValue: (_date: string) => {
  //       const date = new Date(_date);
  //       const day = date.getDate();
  //       const month = date.getMonth() + 1;
  //       const year = date.getFullYear();

  //       dayInputRef.current?.setValue(day.toString());
  //       monthInputRef.current?.setValue(month.toString());
  //       yearInputRef.current?.setValue(year.toString());
  //     },
  //     validate: () => {
  //       dayInputRef.current?.validate();
  //       monthInputRef.current?.validate();
  //       yearInputRef.current?.validate();
  //     },
  //     focus: () => dayInputRef.current?.focus(),
  //     blur: () => {
  //       dayInputRef.current?.blur();
  //       monthInputRef.current?.blur();
  //       yearInputRef.current?.blur();
  //     },
  //     clear: () => {
  //       dayInputRef.current?.clear();
  //       monthInputRef.current?.clear();
  //       yearInputRef.current?.clear();
  //     },
  // };
</script>

<Row justify="space-between" gap="nm" class="WuiInput__date">
  <Select placeholder="Month" {...$$restProps}>
    <Option value="1">January</Option>
    <Option value="2">February</Option>
    <Option value="3" selected>March</Option>
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
    bind:this={monthInput}
    type="text"
    placeholder="Day"
    masks={{max: 31}}
    {...$$restProps}
    maxlength={2}
    class="WuiInput__date__day"
  />

  <BaseInput
    bind:this={yearInput}
    type="text"
    placeholder="Year"
    {...$$restProps}
    maxlength={4}
    class="WuiInput__date__year"
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
  }
</style>