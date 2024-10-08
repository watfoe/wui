import type { WuiSize } from '$lib/types';
import type { SurfaceAttributes } from '../surface';
import type { Snippet } from 'svelte';

export interface InputMasks {
  cast?: 'string' | 'number';
  number?: boolean;
  alpha?: boolean;
  max?: string | number;
}

interface RegexRule {
  expr: RegExp;
  message: string;
}
export interface InputRules {
  required?: string | boolean;
  minlength?: {
    value: number;
    message: string;
  };
  maxlength?: {
    value: number;
    message: string;
  };
  lessthan?: {
    value: number;
    message: string;
  };
  morethan?: {
    value: number;
    message: string;
  };
  regex?: RegexRule | RegexRule[];
  rule?(value: string): void;
}

export type BaseInputAttributes<E extends keyof svelteHTML.IntrinsicElements = 'input'> = Omit<SurfaceAttributes<E>, 'element' | 'align' | 'justfiy' | 'direction' | 'wrap' | 'size' | 'prefix'> & {
  align?: 'left' | 'center' | 'right'; // Controls the alignment of the input value
  error?: ValidationError | string;
  masks?: InputMasks;
  onvalidate?: (error?: ValidationError) => void;
  prefix?: Snippet | string;
  rules?: InputRules;
  required?: boolean;
  size?: WuiSize;
  suffix?: Snippet | string;
  validateon?: 'blur' | 'input' | 'submit';
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'yyyy-mm-dd' | 'dd-mm-yyyy';

export function mask(value: string, masks: InputMasks) {
  // Do mind the ordering of the masks as it may result in unexpected
  // behaviour
  if (masks?.number && /[\D]+/.test(value)) {
    return value.slice(0, value.length - 1);
  } else if (masks?.alpha && /[\d]+/.test(value)) {
    return value.slice(0, value.length - 1);
  }

  if (masks?.cast === 'string') {
    return value.replace(/[\d]/g, '');
  } else if (masks?.cast === 'number') {
    return value.replace(/[\D]/g, '');
  }

  if (masks?.max && Number(value) > Number(masks?.max)) {
    return value.slice(0, value.length - 1);
  }

  return value;
}

export function validate(value: string, rules: InputRules) {
  if (rules?.required && (value.length === 0 || value === undefined)) {
    throw new ValidationError(typeof rules.required === 'string' ? rules.required : 'Please enter a value');
  } else if (!rules?.required && (value.length === 0 || value === undefined)) {
    return;
  }

  if (rules?.minlength && value.length < rules?.minlength.value) {
    throw new ValidationError(rules?.minlength.message);
  }
  if (rules?.maxlength && Number(value) > rules?.maxlength.value) {
    throw new ValidationError(rules?.maxlength.message);
  }
  if (rules?.lessthan && Number(value) >= rules?.lessthan.value) {
    throw new ValidationError(rules?.lessthan.message);
  }
  if (rules?.morethan && Number(value) <= rules?.morethan.value) {
    throw new ValidationError(rules?.morethan.message);
  }
  if (rules?.regex) {
    if (Array.isArray(rules?.regex)) {
      rules.regex.forEach(rule => {
        if (!rule.expr.test(value)) {
          throw new ValidationError(rule.message);
        }
      });
    } else {
      if (!rules.regex.expr.test(value)) {
        throw new ValidationError(rules?.regex.message);
      }
    }
  }
  if (typeof rules?.rule === 'function') {
    try {
      rules?.rule(value);
    } catch (error) {
      if (error instanceof ValidationError) {
        throw error;
      }
      throw new ValidationError((error as { message: string }).message);
    }
  }
}

export function splitDate(value: string, format: DateFormat) {
  if (format === 'mm/dd/yyyy') {
    const [_month, _day, _year] = value.split('/');
    return _r(_day, _month, _year);
  } else if (format === 'dd/mm/yyyy') {
    const [_day, _month, _year] = value.split('/');
    return _r(_day, _month, _year);
  } else if (format === 'yyyy/mm/dd') {
    const [_year, _month, _day] = value.split('/');
    return _r(_day, _month, _year);
  } else if (format === 'yyyy-mm-dd') {
    const [_year, _month, _day] = value.split('-');
    return _r(_day, _month, _year);
  } else if (format === 'dd-mm-yyyy') {
    const [_day, _month, _year] = value.split('-');
    return _r(_day, _month, _year);
  }

  function _r(_day: string, _month: string, _year: string): string[] {
    // remove leading zeros
    _month = _month.replace(/^0+/, '');
    return [_day, _month, _year];
  }
}

export function splitDateTime(date: string): string[] {
  return date.split('T');
}
