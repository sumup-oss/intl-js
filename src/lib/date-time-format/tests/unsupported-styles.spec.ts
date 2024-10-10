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

import { vi, describe, it, expect } from 'vitest';
import { Intl } from 'temporal-polyfill';

import { formatDateTime } from '..';

import { dates, datetimes, times } from './shared';

vi.mock('../intl', async () => {
  const intl = await vi.importActual('../intl');
  return { ...intl, isDateTimeStyleSupported: false };
});

const locale = 'xx-XX';

describe('Dates & times', () => {
  describe('when the `dateStyle` and `timeStyle` options are unsupported', () => {
    it('should fallback to an approximate date format', () => {
      const date = dates[0];
      const actual = formatDateTime(date, locale, { dateStyle: 'short' });
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
      });
    });

    it('should fallback to an approximate time format', () => {
      const time = times[0];
      const actual = formatDateTime(time, locale, { timeStyle: 'short' });
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    });

    it('should fallback to an approximate date time format', () => {
      const date = datetimes[0];
      const actual = formatDateTime(date, locale, {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    });
  });
});
