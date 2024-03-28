export type DateFormat = 'mm/dd/yyyy' | 'dd/mm/yyyy' | 'yyyy/mm/dd' | 'yyyy-mm-dd' | 'dd-mm-yyyy';

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