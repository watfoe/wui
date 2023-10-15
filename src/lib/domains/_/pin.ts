import ParseError from "./parse-error";

export default class Pin {
  private readonly value: string;

  constructor(_value: string, length: number = 6) {
    if (!this.isValid(_value, length)) {
      throw new ParseError('Invalid pin');
    }

    this.value = _value;
  }

  private isValid(value: string, length: number): boolean {
    const regex = new RegExp(`^[0-9]{${length}}$`);

    return regex.test(value);
  }

  toString(): string {
    return this.value;
  }
}
