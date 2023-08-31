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

import { formatNumberToParts, formatCurrencyToParts } from '..';
import { CURRENCIES_WITHOUT_DECIMALS } from '../../../data/currencies';

import { locales, number } from './shared';

describe('Numbers', () => {
  describe('formatNumberToParts', () => {
    it.each(locales)('should format a number for %o', (locale) => {
      const actual = formatNumberToParts(number, locale);
      expect(actual).toBeArray();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'decimal',
      });
    });

    it.each(locales)('should format a unit number for %o', (locale) => {
      const actual = formatNumberToParts(number, locale, {
        style: 'unit',
        unit: 'hour',
      });
      expect(actual).toBeArray();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'unit',
        unit: 'hour',
      });
    });
  });
});

describe('Currency values', () => {
  describe('formatCurrencyToParts', () => {
    it.each(locales)('should format a currency for %o', (locale) => {
      const actual = formatCurrencyToParts(number, locale);
      expect(actual).toBeArray();

      expect(Intl.NumberFormat).toHaveBeenCalledWith(
        locale,
        expect.objectContaining({
          style: 'currency',
          currency: expect.any(String),
        }),
      );
    });

    it.each(CURRENCIES_WITHOUT_DECIMALS)(
      'should format the %o currency without decimals',
      (currency) => {
        const actual = formatCurrencyToParts(number, undefined, currency);
        expect(actual).toBeArray();

        expect(Intl.NumberFormat).toHaveBeenCalledWith(
          undefined,
          expect.objectContaining({
            style: 'currency',
            currency,
            minimumFractionDigits: 0,
          }),
        );
      },
    );

    it('should accept a custom currency', () => {
      const locale = 'xx-XX';
      const currency = 'XXX';
      const actual = formatCurrencyToParts(number, locale, currency);
      expect(actual).toBeArray();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'currency',
        currency,
      });
    });
  });
});
