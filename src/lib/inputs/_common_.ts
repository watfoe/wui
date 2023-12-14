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

export type BaseProps<T> = T & {
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
  element?: HTMLInputElement;
  error?: ValidationError;
  masks?: InputMasks;
  prefix?: string;
  rules?: InputRules;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  suffix?: string;
  validateon?: 'change' | 'blur' | 'submit';
  variant?: 'solid' | 'outline' | 'soft' | 'plain' | 'none';
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

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
  if (rules?.rule) {
    rules?.rule(value);
  }
}