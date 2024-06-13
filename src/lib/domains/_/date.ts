export interface IDay {
  idx: number;
  short: string;
  abbr: string;
  name: string;
}

export interface IMonth {
  idx: number;
  name: string;
  abbr: string;
  max: number;
}

export const MONTHS = [
  { idx: 0, name: 'January', abbr: 'Jan', max: 31 },
  { idx: 1, name: 'February', abbr: 'Feb', max: 28 },
  { idx: 2, name: 'March', abbr: 'Mar', max: 31 },
  { idx: 3, name: 'April', abbr: 'Apr', max: 30 },
  { idx: 4, name: 'May', abbr: 'May', max: 31 },
  { idx: 5, name: 'June', abbr: 'Jun', max: 30 },
  { idx: 6, name: 'July', abbr: 'Jul', max: 31 },
  { idx: 7, name: 'August', abbr: 'Aug', max: 31 },
  { idx: 8, name: 'September', abbr: 'Sep', max: 30 },
  { idx: 9, name: 'October', abbr: 'Oct', max: 31 },
  { idx: 10, name: 'November', abbr: 'Nov', max: 30 },
  { idx: 11, name: 'December', abbr: 'Dec', max: 31 }
];

export const DAYS = [
  { idx: 0, short: 'Su', abbr: 'Sun', name: 'Sunday' },
  { idx: 1, short: 'Mo', abbr: 'Mon', name: 'Monday' },
  { idx: 2, short: 'Tu', abbr: 'Tue', name: 'Tuesday' },
  { idx: 3, short: 'We', abbr: 'Wed', name: 'Wednesday' },
  { idx: 4, short: 'Th', abbr: 'Thu', name: 'Thursday' },
  { idx: 5, short: 'Fr', abbr: 'Fri', name: 'Friday' },
  { idx: 6, short: 'Sa', abbr: 'Sat', name: 'Saturday' }
];

export class Day {
  index: number;
  private _day: IDay;
  private _date: number;
  private _week: Week;
  private _isPhantom = false;

  /**
   * @param index 0-based index of the day. 0 is Sunday, 1 is Monday, and so on.
   * @example
   * const day = new Day(0); // Sunday
   */
  constructor(index: number, week: Week) {
    if (index < 0 || index > 6) {
      throw new Error('Invalid day index');
    }

    this._day = DAYS[index];
    this.index = index;
    this._week = week;

    this._date = this.calcDate();
  }

  static today() {
    const today = new Date();
    return new Day(today.getDay(), new Week(0, new Month(today.getMonth(), today.getFullYear())));
  }

  name() {
    return this._day.name;
  }

  abbr() {
    return this._day.abbr;
  }

  short() {
    return this._day.short;
  }

  week() {
    return this._week;
  }

  month() {
    return this.week().month();
  }

  year() {
    return this.month().year();
  }

  date() {
    return this._date;
  }

  isPhantom() {
    return this._isPhantom;
  }

  private calcDate() {
    const offset = this.month().offset();
    let date = this.week().index * 7 + this.index + 1 - offset;

    if (date < 1) {
      const prevMonthDays = this.month().prev().noOfDays();
      date += prevMonthDays;
      this._week = this.week().prev();
      this._isPhantom = true;
    } else if (date > this.month().noOfDays()) {
      date = date - this.month().noOfDays();
      this._week = this.week().next();
      this._isPhantom = true;
    }

    return date;
  }

  prev() {
    let index = this.index - 1;
    let week = this.week();

    if (index === -1) {
      index = 6;
      week = week.prev();
    }

    return new Day(index, week);
  }

  next() {
    let index = this.index + 1;
    let week = this.week();

    if (this.date() === this.month().noOfDays()) {
      index = 0;
      week = week.next();
    } else if (index === 6) {
      index = 0;
      week = week.next();
    }

    return new Day(index, week);
  }

  isToday() {
    const today = new Date();
    return today.getDate() === this._date &&
           today.getMonth() === this.month().index &&
           today.getFullYear() === this.year();
  }

  isWeekend() {
    return this.index === 0 || this.index === 6;
  }
}

export class Week {
  index: number;
  private _month: Month;

  constructor(index: number, month: Month) {
    this.index = index;
    this._month = month;
  }

  static thisWeek() {
    const today = new Date();
    const month = MONTHS[today.getMonth()];
    const day = today.getDate();
    const week = Math.ceil((month.max + day) / 7);

    return new Week(week, new Month(today.getMonth(), today.getFullYear()));
  }

  days() {
    return DAYS.map(d => new Day(d.idx, this));
  }

  firstDay() {
    return this.days()[0];
  }

  lastDay() {
    return this.days()[6];
  }

  month() {
    return this._month;
  }

  prev() {
    if (this.index === 0) {
      const prevMonth = this._month.prev();
      return new Week(prevMonth.noOfWeeks() - 1, prevMonth);
    }

    return new Week(this.index - 1, this._month);
  }

  next() {
    if (this.index === this._month.noOfWeeks() - 1) {
      const nextMonth = this._month.next();
      return new Week(0, nextMonth);
    }

    return new Week(this.index + 1, this._month);
  }
}

export class Month {
  index: number;
  private _month: IMonth;
  private _year: number;

  /**
   * @param index 0-based index of the month
   * @example
   * const month = new Month(0); // January
   */
  constructor(index: number, year: number) {
    if (index < 0 || index > 11) {
      throw new Error('Invalid month index');
    }

    this.index = index;
    this._month = MONTHS[index];
    this._year = year;
  }

  static thisMonth() {
    const today = new Date();
    return new Month(today.getMonth(), today.getFullYear());
  }

  /**
   * Searches for a month by name or abbreviation.
   */
  static search(str: string) {
    let month = -1;
    if (str.length === 3) {
      month = MONTHS.findIndex(m => m.abbr.toLowerCase() === str.toLowerCase());
    } else {
      month = MONTHS.findIndex(m => m.name.toLowerCase() === str.toLowerCase());
    }

    if (month > -1) {
      return new Month(month, (new Date().getFullYear()));
    }
  }

  static list() {
    return MONTHS;
  }

  name() {
    return this._month.name;
  }

  abbr() {
    return this._month.abbr;
  }

  year() {
    return this._year;
  }

  /**
   * Gets the maximum number of days in the month.
   * Provide the year if you want to check for leap year. It will default to current year in case of february.
   *
   * @param year 4-digit year (optional).
   */
  noOfDays() {
    if (this.index === 1) {
      // Century leap years  (divisible by 400)
      if (this._year % 400 === 0 || (this._year % 4 === 0 && this._year % 100 !== 0)) {
        return 29;
      }
    }

    return this._month.max;
  }

  /**
   * Gets the 0-based index of the first day of the month. 0 is Sunday, 1 is Monday, and so on.
   */
  offset() {
    return new Date(this._year, this.index, 1).getDay();
  }

  prev() {
    if (this.index === 0) {
      return new Month(11, this._year - 1);
    }

    return new Month(this.index - 1, this._year);
  }

  next() {
    if (this.index === 11) {
      return new Month(0, this._year + 1);
    }

    return new Month(this.index + 1, this._year);
  }

  noOfWeeks() {
    const offset = this.offset();
    const last = this.noOfDays();
    const weeks = Math.ceil((last + offset) / 7);

    return weeks;
  }

  weeks() {
    const weeks = [];
    for (let i = 0; i < this.noOfWeeks(); i++) {
      weeks.push(new Week(i, this));
    }

    return weeks;
  }
}