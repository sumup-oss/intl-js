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
import { Intl } from 'temporal-polyfill';
import { describe, expect, it } from 'vitest';

import { formatDate, formatDateTime, formatTime } from '../index.js';

import { dates, datetimes, locales, times } from './shared.js';

describe('Dates & times', () => {
  describe('formatDateTime', () => {
    it.each(locales)('should format a date time for %o', (locale) => {
      const date = datetimes[0];
      const actual = formatDateTime(date, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, undefined);
    });

    it.each(datetimes)('should format a %o', (date) => {
      const locale = locales[0];
      const actual = formatDateTime(date, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, undefined);
    });
  });

  describe('formatDate', () => {
    it.each(locales)('should format a date for %o', (locale) => {
      const date = dates[0];
      const actual = formatDate(date, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        dateStyle: 'short',
      });
    });

    it.each(dates)('should format a %o', (date) => {
      const locale = locales[0];
      const actual = formatDate(date, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        dateStyle: 'short',
      });
    });
  });

  describe('formatTime', () => {
    it.each(locales)('should format a time for %o', (locale) => {
      const time = times[0];
      const actual = formatTime(time, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        timeStyle: 'short',
      });
    });
    it.each(times)('should format a %o', (time) => {
      const locale = locales[0];
      const actual = formatTime(time, locale);
      expect(actual).toBeString();
      expect(Intl.DateTimeFormat).toHaveBeenCalledWith(locale, {
        timeStyle: 'short',
      });
    });
  });
});
