/**
 * Copyright 2022, SumUp Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Temporal } from 'temporal-polyfill';
import { describe, expect, it, vi } from 'vitest';

import {
  formatDateTime,
  formatDateTimeRange,
  formatDateTimeRangeToParts,
  formatDateTimeToParts,
  resolveDateTimeFormat,
} from '../index.js';

import { dates, datetimes, times } from './shared.js';

vi.mock('../intl', async () => {
  const intl = await vi.importActual('../intl');
  return {
    ...intl,
    isDateTimeFormatSupported: false,
    isDateTimeFormatToPartsSupported: false,
    isDateTimeFormatRangeSupported: false,
  };
});

const locale = 'xx-XX';

describe('Dates & times', () => {
  describe('when Intl.DateTimeFormat is unsupported', () => {
    it.each(dates)('should format a %o as a date', (date) => {
      const actual = formatDateTime(date, locale, { dateStyle: 'short' });
      expect(actual).toMatchSnapshot();
    });

    it.each(times)('should format a %o as a time', (time) => {
      const actual = formatDateTime(time, locale, { timeStyle: 'short' });
      expect(actual).toMatchSnapshot();
    });

    it.each(datetimes)('should format a %o as a date time', (date) => {
      const actual = formatDateTime(date, locale, {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      expect(actual).toMatchSnapshot();
    });

    it('should format a datetime range', () => {
      const startDate = new Temporal.PlainDate(2024, 1, 1, 'gregory');
      const endDate = new Temporal.PlainDate(2024, 2, 1, 'gregory');
      const actual = formatDateTimeRange(startDate, endDate, locale);
      expect(actual).toBe('1/1/2024 – 2/1/2024');
    });

    it('should format a datetime range to parts', () => {
      const startDate = new Temporal.PlainDate(2024, 1, 1, 'gregory');
      const endDate = new Temporal.PlainDate(2024, 2, 1, 'gregory');
      const actual = formatDateTimeRangeToParts(startDate, endDate, locale);
      expect(actual).toEqual([
        {
          'type': 'literal',
          'value': '1/1/2024',
        },
        {
          'type': 'literal',
          'value': ' – ',
        },
        {
          'type': 'literal',
          'value': '2/1/2024',
        },
      ]);
    });

    it('should format a date time to a single literal part', () => {
      const date = datetimes[0];
      const parts = formatDateTimeToParts(date, locale);
      expect(parts).toHaveLength(1);
      expect(parts[0]).toHaveProperty('type', 'literal');
      expect(parts[0]).toHaveProperty('value', '12/31/1899, 12:00:00 AM');
    });

    it('should return `null` for the date time format', () => {
      const actual = resolveDateTimeFormat(locale);
      expect(actual).toBeNull();
    });
  });
});
