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

import { format, formatCurrency } from '..';

import { locales, number } from './shared';

describe('Format', () => {
  describe('number', () => {
    it.each(locales)('should format a number for %o', (locale) => {
      const actual = format(number, locale);
      expect(actual).toBeString();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'decimal',
      });
    });

    it.each(locales)('should format a unit number for %o', (locale) => {
      const actual = format(number, locale, {
        style: 'unit',
        unit: 'hour',
      });
      expect(actual).toBeString();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'unit',
        unit: 'hour',
      });
    });
  });

  describe('currency', () => {
    it.each(locales)('should format a currency for %o', (locale) => {
      const actual = formatCurrency(number, locale);
      expect(actual).toBeString();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'currency',
        currency: expect.any(String),
      });
    });

    it('should format as a unitless number if currency is not found', () => {
      const actual = formatCurrency(number, 'xx-XX');
      expect(actual).toBeString();
      expect(Intl.NumberFormat).toHaveBeenCalledWith('xx-XX', {
        style: 'decimal',
      });
    });
  });
});