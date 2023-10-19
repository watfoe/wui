<script lang="ts">
	import { Row } from "$lib/layout";
  import BaseInput, { type BaseInputProps } from "../base/index.svelte";
	import type { ValidationError } from "../_common_";

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

<Row justify="space-between" class="cs-input-date-cont">
  <BaseInput
    bind:this={dayInput}
    type="number"
    placeholder="MM"
    masks={{max: 12}}
    {...$$restProps}
    maxlength={2}
    on:change={monthOnValid}
  />

  <BaseInput
    bind:this={monthInput}
    type="number"
    placeholder="DD"
    masks={{max: 31}}
    {...$$restProps}
    maxlength={2}
    on:change={dateOnValid}
  />

  <BaseInput
    bind:this={yearInput}
    type="number"
    placeholder="YYYY"
    {...$$restProps}
    maxlength={4}
  />
</Row>