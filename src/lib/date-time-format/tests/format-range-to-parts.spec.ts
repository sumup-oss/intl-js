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

import { formatDateTimeRangeToParts } from '../index.js';

import { locales } from './shared.js';

describe('Dates & times', () => {
  describe('formatDateTimeRangeToParts', () => {
    it('should format a datetime range', () => {
      const locale = locales[0];
      const startDate = new Temporal.PlainDate(2024, 1, 1);
      const endDate = new Temporal.PlainDate(2024, 2, 1);
      const actual = formatDateTimeRangeToParts(startDate, endDate, locale);
      expect(actual).toEqual([
        {
          'source': 'startRange',
          'type': 'day',
          'value': '01',
        },
        {
          'source': 'startRange',
          'type': 'literal',
          'value': '.',
        },
        {
          'source': 'startRange',
          'type': 'month',
          'value': '01',
        },
        {
          'source': 'shared',
          'type': 'literal',
          'value': '. – ',
        },
        {
          'source': 'endRange',
          'type': 'day',
          'value': '01',
        },
        {
          'source': 'endRange',
          'type': 'literal',
          'value': '.',
        },
        {
          'source': 'endRange',
          'type': 'month',
          'value': '02',
        },
        {
          'source': 'shared',
          'type': 'literal',
          'value': '.',
        },
        {
          'source': 'shared',
          'type': 'year',
          'value': '2024',
        },
      ]);
    });

    it.each(locales)('should format a date time range for %o', (locale) => {
      const startDate = new Temporal.PlainDate(2024, 1, 1);
      const endDate = new Temporal.PlainDate(2024, 2, 1);
      const actual = formatDateTimeRangeToParts(startDate, endDate, locale);
      expect(actual).toBeArray();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, undefined);
    });
  });
});
