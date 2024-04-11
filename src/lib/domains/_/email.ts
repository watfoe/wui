import ParseError from "./parse-error";

export default class Email {
  private readonly value: string;

  constructor(_value: string) {
    if (!this.startsWithLetterOrNum(_value)) {
      throw new ParseError('Email must start with a letter or number');
    }

    _value = _value.toLowerCase().trim();

    if (!this.isValid(_value)) {
      throw new ParseError('Invalid email');
    }

    this.value = _value;
  }

  private isValid(value: string): boolean {
    return (
      value.match(/^[a-zA-Z0-9]+(?:[\.\-\+\_]{0,1}[a-zA-Z0-9]+)+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,4}$/) !== null
    );
  }

  private startsWithLetterOrNum(value: string): boolean {
    return value.match(/^[a-zA-Z0-9]+.*/) !== null;
  }

  toString(): string {
    return this.value;
  }
}