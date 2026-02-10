import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { Duration } from 'dayjs/esm/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DurationUnitType } from 'dayjs/plugin/duration';

dayjs.extend(customParseFormat);

export type Dayjs = dayjs.Dayjs;

/**
 * Date utility service to replace moment.js
 * Uses dayjs for better performance and smaller bundle size
 */
@Injectable({ providedIn: 'root' })
export class DateUtilsService {
  /**
   * Parse a date string or convert Date to Dayjs object
   */
  parseDate(date: string | Date | dayjs.Dayjs | null | undefined): dayjs.Dayjs | null {
    if (!date) {return null;}
    return dayjs(date);
  }

  /**
   * Format a date
   */
  formatDate(date: string | Date | dayjs.Dayjs | null | undefined, format = 'YYYY-MM-DD HH:mm:ss'): string {
    if (!date) {return '';}
    return dayjs(date).format(format);
  }

  /**
   * Get current date/time
   */
  now(): dayjs.Dayjs {
    return dayjs();
  }

  /**
   * Check if date is valid
   */
  isValid(date: string | Date | dayjs.Dayjs | null | undefined): boolean {
    if (!date) {return false;}
    return dayjs(date).isValid();
  }

  /**
   * Get date duration
   */
  duration(value: number, unit: dayjs.OpUnitType = 'milliseconds'): Duration {
    return dayjs.duration(value, unit as DurationUnitType);
  }

  /**
   * Format duration
   */
  formatDuration(ms: number): string {
    const dur = dayjs.duration(ms);
    return `${dur.hours()}h ${dur.minutes()}m ${dur.seconds()}s`;
  }

  /**
   * Compare two dates
   */
  isBefore(date1: string | Date | dayjs.Dayjs | null | undefined, 
    date2: string | Date | dayjs.Dayjs | null | undefined): boolean {
    if (!date1 || !date2) {return false;}
    return dayjs(date1).isBefore(dayjs(date2));
  }

  /**
   * Check if dates are equal
   */
  isSame(date1: string | Date | dayjs.Dayjs | null | undefined, 
    date2: string | Date | dayjs.Dayjs | null | undefined, unit: dayjs.OpUnitType = 'day'): boolean {
    if (!date1 || !date2) {return false;}
    return dayjs(date1).isSame(dayjs(date2), unit);
  }

  /**
   * Add time to date
   */
  add(date: string | Date | dayjs.Dayjs | null | undefined, value: number, unit: dayjs.ManipulateType = 'day'): dayjs.Dayjs | null {
    if (!date) {return null;}
    return dayjs(date).add(value, unit);
  }

  /**
   * Subtract time from date
   */
  subtract(date: string | Date | dayjs.Dayjs | null | undefined, value: number, unit: dayjs.ManipulateType = 'day'): dayjs.Dayjs | null {
    if (!date) {return null;}
    return dayjs(date).subtract(value, unit);
  }
}
