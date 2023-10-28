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
  prefix?: string;
  suffix?: string;
  masks?: InputMasks;
  rules?: InputRules;
  validateon?: 'change' | 'blur';
};

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export function mask(_value: string, masks: InputMasks) {
  // Do mind the ordering of the masks as it may result in unexpected
  // behaviour
  if (masks?.number && /[\D]+/.test(_value)) {
    return _value.slice(0, _value.length - 1);
  } else if (masks?.alpha && /[\d]+/.test(_value)) {
    return _value.slice(0, _value.length - 1);
  }

  if (masks?.cast === 'string') {
    return _value.replace(/[\d]/g, '');
  } else if (masks?.cast === 'number') {
    return _value.replace(/[\D]/g, '');
  }

  if (masks?.max && Number(_value) > Number(masks?.max)) {
    return _value.slice(0, _value.length - 1);
  }

  return _value;
}

export function validate(_value: string, rules: InputRules) {
  if (rules?.required && _value.length === 0) {
    throw new ValidationError(
      rules?.required && typeof rules.required === 'string' ?
        rules.required :
        'This field is required'
    );
  }
  if (rules?.minlength && _value.length < rules?.minlength.value) {
    throw new ValidationError(rules?.minlength.message);
  }
  if (rules?.maxlength && Number(_value) > rules?.maxlength.value) {
    throw new ValidationError(rules?.maxlength.message);
  }
  if (rules?.lessthan && Number(_value) >= rules?.lessthan.value) {
    throw new ValidationError(rules?.lessthan.message);
  }
  if (rules?.morethan && Number(_value) <= rules?.morethan.value) {
    throw new ValidationError(rules?.morethan.message);
  }
  if (rules?.regex) {
    if (Array.isArray(rules?.regex)) {
      rules.regex.forEach(rule => {
        if (!rule.expr.test(_value)) {
          throw new ValidationError(rule.message);
        }
      });
    } else {
      if (!rules.regex.expr.test(_value)) {
        throw new ValidationError(rules?.regex.message);
      }
    }
  }
  if (rules?.rule) {
    rules?.rule(_value);
  }
}