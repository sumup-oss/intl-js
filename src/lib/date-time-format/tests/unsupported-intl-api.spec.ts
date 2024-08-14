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

import {
  formatDateTime,
  formatDateTimeToParts,
  resolveDateTimeFormat,
} from '..';

import { date } from './shared';

vi.mock('../intl', async () => {
  const intl = await vi.importActual('../intl');
  return {
    ...intl,
    isDateTimeFormatSupported: false,
    isDateTimeFormatToPartsSupported: false,
  };
});

const locale = 'xx-XX';

describe('Dates & times', () => {
  describe('when Intl.DateTimeFormat is unsupported', () => {
    it('should format a date', () => {
      const actual = formatDateTime(date, locale, { dateStyle: 'short' });
      expect(actual).toMatchInlineSnapshot('"12/31/1899"');
    });

    it('should format a time', () => {
      const actual = formatDateTime(date, locale, { timeStyle: 'short' });
      expect(actual).toMatchInlineSnapshot('"12:00:00 AM"');
    });

    it('should format a date time', () => {
      const actual = formatDateTime(date, locale, {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      expect(actual).toMatchInlineSnapshot('"12/31/1899, 12:00:00 AM"');
    });

    it('should format a date time to a single literal part', () => {
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
