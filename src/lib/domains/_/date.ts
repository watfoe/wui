import ParseError from "./parse-error";

export default class CDate {
  private input: {year: number; month: number; day: number};
  private readonly value: Date;

  constructor(year: number, month: number, day: number) {
    if (!this.isMonthValid(month)) {
      throw new ParseError('Invalid month');
    }

    if (!this.isDayValid(day)) {
      throw new ParseError('Invalid day');
    }

    const date = new Date(year, month, day);
    this.value = date;
    this.input = {year, month, day};
  }

  isLessThan(date: Date): boolean {
    return this.value.getTime() < date.getTime();
  }

  isLessThanCurrentDate(): boolean {
    const date = new Date();
    return this.value.getTime() < date.getTime();
  }

  isGreaterThan(date: CDate): boolean {
    return this.value.getTime() > date.value.getTime();
  }

  isGreaterThanCurrentDate(): boolean {
    const date = new Date();
    return this.value.getTime() > date.getTime();
  }

  yearsElapsed(date: CDate): number {
    return date.value.getFullYear() - this.value.getFullYear();
  }

  monthsElapsed(date: CDate): number {
    return (
      this.yearsElapsed(date) * 12 +
      date.value.getMonth() -
      this.value.getMonth()
    );
  }

  daysElapsed(date: CDate): number {
    return date.value.getDate() - this.value.getDate();
  }

  private isMonthValid(month: number): boolean {
    return month > 0 && month < 13;
  }

  private isDayValid(day: number): boolean {
    return day > 0 && day < 32;
  }

  toString(): string {
    return this.value.toISOString();
  }

  toObject(): {year: number; month: number; day: number} {
    return this.input;
  }
}