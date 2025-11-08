/**
 * Copyright 2020, SumUp Ltd.
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

// biome-ignore lint/suspicious/noShadowRestrictedNames: Necessary for the polyfill to work
import { Intl, Temporal } from 'temporal-polyfill';
import { describe, expect, it } from 'vitest';

import { formatDateTimeRange } from '../index.js';

import { locales } from './shared.js';

describe('Dates & times', () => {
  describe('formatDateTimeRange', () => {
    it('should format a datetime range', () => {
      const locale = locales[0];
      const start = new Temporal.PlainDate(2024, 1, 1);
      const end = new Temporal.PlainDate(2024, 2, 1);
      const actual = formatDateTimeRange(start, end, locale);
      expect(actual).toBe('01.01. – 01.02.2024');
    });

    it('should format a time range', () => {
      const locale = locales[1];
      const start = new Temporal.PlainTime(11, 30);
      const end = new Temporal.PlainTime(12, 45);
      const actual = formatDateTimeRange(start, end, locale, {
        timeStyle: 'short',
      });
      expect(actual).toBe('11:30 a.m. – 12:45 p.m.');
    });

    it.each(locales)('should format a date time range for %o', (locale) => {
      const startDate = new Temporal.PlainDate(2024, 1, 1);
      const endDate = new Temporal.PlainDate(2024, 2, 1);
      const actual = formatDateTimeRange(startDate, endDate, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, undefined);
    });
  });
});
