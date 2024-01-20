import { type CountryCode, parsePhoneNumberWithError } from 'libphonenumber-js/max';
import ParseError from './parse-error';

export class ValidationError {
  constructor(public message: string) {
    this.message = message;
  }
}

export default class Phone {
  private readonly value: string;
  private readonly phonenumber;

  constructor(_value: string, _countryCode: CountryCode = 'KE') {
    const phonenumber = parsePhoneNumberWithError(_value, _countryCode);

    if (!phonenumber.isValid()) {
      throw new ParseError('Invalid phone number');
    }

    this.value = _value;
    this.phonenumber = phonenumber;
  }

  get countryCode(): string {
    return this.phonenumber.countryCallingCode;
  }

  get number(): string {
    return this.value;
  }

  get national(): string {
    return this.phonenumber.formatNational();
  }

  get international(): string {
    return this.phonenumber.formatInternational();
  }

  toString(): string {
    return this.phonenumber.formatInternational();
  }
}