// HRDotNet-Mobile
// Designed by : Alex Diane Vivienne Candano
// Developed by: Patrick William Quintana Lofranco, Jessie Cuerda

import customParseFormat from 'dayjs/plugin/customParseFormat';
import dayjs from 'dayjs';

dayjs.extend(customParseFormat);

export enum DateTimeFormat {
  DayDate = 'ddd, MMM DD, YYYY',
  HalfMonthWord = 'MMM DD, YYYY',
  MonthDay = 'MMM DD',
  DayYear = 'DD, YYYY',
  IsoBasic = 'YYYYMMDD',
  MilitaryTime = 'HH:mm',
  StandardTime = 'hh:mm A',
  MonthDayWithName = 'ddd, MMM DD',
  Extended12TimeFormat = 'hh:mm:ss',
  Extended24TimeFormat = 'HH:mm:ss',
}

export const DateTimeUtils = {
  day: () => dayjs(),
  dayToDate: () => dayjs().toDate(),

  dayDateComplete: () => dayjs().format('MMMM DD, YYYY, dddd'),
  dayDateComplete2: () => dayjs().format('MMMM DD, YYYY dddd'),
  dayTimeWithSeconds: () => dayjs().format('h:mm:ss A'),

  getDay: () => dayjs(),
  getDayIso: () => dayjs().toISOString(),
  getCurrYear: () => dayjs().format('YYYY'),
  getCurrDateDefault: () => dayjs().format('YYYYMMDD'),
  getCurrDateDefaultAddDay: () => dayjs().add(1, 'day').format('YYYYMMDD'),
  getCurrDateDefaultLessDay: () => dayjs().subtract(1, 'day').format('YYYYMMDD'),

  getCurrTimeDefault: () => dayjs().format('HH:mm:ss'),
  getCurrTimeWithSecondsUnits: () => dayjs().format('hh:mm:ss A'),
  getCurrWordMonth: () => dayjs().format('MMMM'),
  getCurrWordYear: () => dayjs().format('YYYY'),
  getCurrDateDash: () => dayjs().format('YYYY-MM-DD'),
  getCurrDateDashWithTZ: () => dayjs().format('YYYY-MM-DDT00:00:00'),
  getCurrDateWord: () => dayjs().format('MMMM DD, YYYY'),
  getCurrDateDashLessDay: () => dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  getCurrDateDashAddDay: () => dayjs().add(1, 'day').format('YYYY-MM-DD'),

  getCurrDateWordWithDay: () => dayjs().format('MMMM D, YYYY, dddd'),

  getIsoTimeDefaultWithUnits: () => dayjs().format('hh:mm A'),
  getIsoDateWithBackSlash: () => dayjs().format('MM/DD/YYYY'),

  dateToDate: (date: string) => dayjs(date).toDate(),
  dateWordToDefault: (date: string) => dayjs(date, 'MMMM DD, YYYY').format('YYYYMMDD'),
  dateDefaultToFullWord: (date: string) => dayjs(date, 'YYYYMMDD').format('MMMM DD, YYYY, dddd'),
  dateToDefaultHalfFullDate: (date: string) => dayjs(date, 'YYYYMMDD').format('MM/DD/YY, dddd'),
  dateDefaultToWord: (date: string) => dayjs(date, 'YYYYMMDD').format('MMM DD, YYYY'),
  dateDefaultToDate: (date: string) => dayjs(date, 'YYYYMMDD').toDate(),
  dateDefaultToHalfWord: (date: string) => dayjs(date, 'YYYYMMDD').format('MMM DD'),

  dateDashToDefault: (date: string) => dayjs(date, 'YYYY-MM-DD').format('YYYYMMDD'),
  dateDashToDefaultAddDay: (date: string) => dayjs(date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),
  dateDashToDefaultLessDay: (date: string) => dayjs(date, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD'),

  dateDefaultToHalfMonthWord: (date: string) => dayjs(date, 'YYYYMMDD').format('MMM DD, YYYY'),
  dateDefaultToHalfMonthDay: (date: string) => dayjs(date, 'YYYYMMDD').format('MMM DD, ddd'),
  dateDefaultToWordMonthYear: (date: string) => dayjs(date, 'YYYYMMDD').format('MMMM, YYYY'),
  dateDashToWordMonthYear: (date: string) => dayjs(date, 'YYYY-MM-DD').format('MMMM, YYYY'),

  dateWordToDash: (date: string) => dayjs(date, 'MMMM DD, YYYY').format('YYYY-MM-DD'),
  dateDashToWord: (date: string) => dayjs(date, 'YYYY-MM-DD').format('MMMM DD, YYYY'),
  dateDashToWithTZ: (date: string) => dayjs(date, 'YYYY-MM-DD').format('YYYY-MM-DDT00:00:00'),
  dateDashToWithTZAddDay: (date: string) => dayjs(date, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DDT00:00:00'),
  dateDashToWithTZLessDay: (date: string) => dayjs(date, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
  dateToDefault: (date: string) => dayjs(date, 'MMMM DD, YYYY').subtract(1, 'day').format('YYYY-MM-DDT00:00:00'),
  dateDefaultToDash: (date: string) => dayjs(date, 'YYYYMMDD').format('YYYY-MM-DD'),
  dateLessDayToDash: (date: string) => dayjs(date).subtract(1, 'day').format('YYYY-MM-DD'),
  dateAddDayToDash: (date: string) => dayjs(date).add(1, 'day').format('YYYY-MM-DD'),
  dateDashToStartToDate: (date: string) => dayjs(date, 'YYYY-MM-DD').startOf('day').toDate(),
  dateCheckYesterday: (date: string) => dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day'),
  dateCheckTomorrow: (date: string) => dayjs(date).isSame(dayjs().add(1, 'day'), 'day'),
  dateCheckToday: (date: string) => dayjs(date).isSame(dayjs(), 'day'),

  isoToDateWord: (date: string) => dayjs(date).format('MMM DD, YYYY'),
  isoToDateDash: (date: string) => dayjs(date).format('YYYY-MM-DD'),
  isoToDateDefault: (date: string) => dayjs(date).format('YYYYMMDD'),
  isoToDateSlash: (date: string) => {
    return dayjs(date).format('DD/MM/YYYY');
  },

  isoToTimeUnits: (time: string) => dayjs(time).format('h:mm A'),
  isoToDate: (time: string) => dayjs(time).toDate(),
  isoToDefaultTime: (time: string) => dayjs(time).format('HH:mm:00'),
  extractTime: (isoString: string) => {
    const d = dayjs(isoString);
    return d.format('HH:mm:ss');
  },

  timeToDate: (time: string) => dayjs(time, 'HH:mm:ss').toDate(),
  timeWithSeconds: (time: string) => dayjs(time).format('HH:mm:ss'),
  timeSecondsSetZeroSeconds: (time: string) => dayjs(time, 'HH:mm:ss').format('HH:mm:00'),
  timeSecondsToUnits: (time: string) => dayjs(time, 'HH:mm:ss').format('hh:mm A'),
  timeSecondsToUnitsZero: (time: string) => {
    const d = dayjs(time);
    return d.set('second', 0).set('millisecond', 0).format('HH:mm:ss');
  },

  timeSingleToDouble: (time: string) => dayjs(time, 'h:mm A').format('h:mm A'),

  defaultStartDate: (date: string) => dayjs(date, 'YYYYMMDD').startOf('day').toDate(),
  defaultEndDate: (date: string) => dayjs(date, 'YYYYMMDD').endOf('day').toDate(),
  monthDayConvert: (date: string) => dayjs(date, 'YYYYMMDD').format('MMM DD'),
  dayYearConvert: (date: string) => dayjs(date, 'YYYYMMDD').format('DD, YYYY'),

  dateAddWorkDayToDash: (date: string) => dayjs(date).add(1, 'day').format('MMM DD, YYYY'),
  dateSubtractOneWorkDayToDash: () => dayjs().subtract(1, 'day').format('MMM DD, YYYY'),

  twoDateRangeFormat: (one: string, two: string) => {
    if (dayjs(one, 'YYYYMMDD').isSame(dayjs(two, 'YYYYMMDD'), 'day')) {
      return DateTimeUtils.dateDefaultToWord(one);
    } else if (dayjs(one, 'YYYYMMDD').isSame(dayjs(two, 'YYYYMMDD'), 'month')) {
      return `${DateTimeUtils.monthDayConvert(one)} - ${DateTimeUtils.dayYearConvert(two)}`;
    } else {
      return `${DateTimeUtils.monthDayConvert(one)} - ${DateTimeUtils.dateDefaultToWord(two)}`;
    }
  },

  twoIsToTimeRangeFormat: (one: string, two: string) => {
    const firstTime = dayjs(one).format('h:mm A');
    const secondTime = dayjs(two).format('h:mm A');
    return firstTime + ' - ' + secondTime;
  },

  twoTimeRangeFormat: (one: string, two: string) => {
    const first = dayjs(one, 'HH:mm:ss').format('hh:mm A');
    const second = two ? dayjs(two, 'HH:mm:ss').format('hh:mm A') : '';
    return first + (two ? ' - ' + second : '');
  },

  twoIsoTimeRangeFormat: (one: string, two: string) => {
    const first = dayjs(one).format('h:mm A');
    const second = two ? dayjs(two).format('h:mm A') : '';
    return first + (two ? ' - ' + second : '');
  },

  dateSubtractOneToDash: () => dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
  dateAddOneToDash: () => dayjs().add(1, 'day').format('YYYY-MM-DD'),

  formatToDefaultDate: (date: string) => {
    if (!date) {
      return new Date();
    }
    return dayjs(date, 'MMM DD, YYYY').toDate();
  },

  checkIsoNullValue: (date: string) => date === '0001-01-01T00:00:00',

  getIsoDateWord: (date: string) => dayjs(date).format(DateTimeFormat.HalfMonthWord),
  isoToTimeSecondToPMAM: (time: string) => dayjs(time, 'HH:mm:ss').format('hh:mm A'),

  monthDayHalfWordMonthConvert: (date: string) => dayjs(date, DateTimeFormat.IsoBasic).format(DateTimeFormat.MonthDay),
  toDateRangeHalftMonthWord: (one: string, two: string) => {
    if (dayjs(one).isSame(dayjs(two), 'day')) {
      return DateTimeUtils.dateDefaultToHalfMonthWord(one);
    } else if (dayjs(one).isSame(dayjs(two), 'month')) {
      return `${DateTimeUtils.monthDayHalfWordMonthConvert(one)} - ${DateTimeUtils.dayYearConvert(two)}`;
    } else if (dayjs(one).isSame(dayjs(two), 'year')) {
      return `${DateTimeUtils.monthDayHalfWordMonthConvert(one)} - ${DateTimeUtils.dateDefaultToHalfMonthWord(two)}`;
    } else {
      return `${DateTimeUtils.dateDefaultToHalfMonthWord(one)} - ${DateTimeUtils.dateDefaultToHalfMonthWord(two)}`;
    }
  },
  getIsoDateFull: (date: string) => dayjs(date).format('YYYYMMDD'),
  getRemoveDash: (date: string) => date.split('T')[0].replace(/-/g, ''),

  formatDateToMonthDayYear: (date: string): string => {
    const parsedDate = dayjs(date, 'MMMM DD, YYYY');

    return parsedDate.isValid() ? parsedDate.format('MMM DD, YYYY') : '';
  },
  abbreviatedMonthDateRange: (fromDateStr: string, toDateStr: string): string => {
    const from = dayjs(fromDateStr);
    const to = dayjs(toDateStr);

    const sameDay = from.date() === to.date() && from.month() === to.month() && from.year() === to.year();

    const sameMonth = from.month() === to.month() && from.year() === to.year();

    const sameYear = from.year() === to.year();

    if (sameDay) {
      return from.format(DateTimeFormat.HalfMonthWord);
    }

    if (!sameYear) {
      return `${from.format("MMM D, YYYY")} - ${to.format("MMM D, YYYY")}`;
    }

    return sameMonth
      ? `${from.format(DateTimeFormat.MonthDay)} - ${to.format(DateTimeFormat.DayYear)}`
      : `${from.format(DateTimeFormat.MonthDay)} - ${to.format(DateTimeFormat.HalfMonthWord)}`;
  },

  // From Jul 12, 2028 to 2028-07-12
  formatToDash: (date: string) => dayjs(date, "MMM D, YYYY").format("YYYY-MM-DD")

};
