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

import { describe, it, expect } from 'vitest';

import { resolveNumberFormat, resolveCurrencyFormat } from '..';
import { CURRENCIES_WITHOUT_DECIMALS } from '../../../data/currencies';

import { locales } from './shared';

describe('Numbers', () => {
  describe('resolveNumberFormat', () => {
    it.each(locales)('should get the format for %o', (locale) => {
      const actual = resolveNumberFormat(locale);
      expect(actual).toBeObject();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'decimal',
      });
    });

    it('should include additional options', () => {
      const locale = 'en-US';
      const actual = resolveNumberFormat(locale);
      expect(actual).toHaveProperty('groupDelimiter', ',');
      expect(actual).toHaveProperty('decimalDelimiter', '.');
    });
  });
});

describe('Currency values', () => {
  describe('resolveCurrencyFormat', () => {
    it.each(locales)('should get the currency format for %o', (locale) => {
      const actual = resolveCurrencyFormat(locale);
      expect(actual).toBeObject();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(
        locale,
        expect.objectContaining({
          style: 'currency',
          currency: expect.any(String),
        }),
      );
    });

    it.each(CURRENCIES_WITHOUT_DECIMALS)(
      'should get the %o currency format without decimals',
      (currency) => {
        const actual = resolveCurrencyFormat(undefined, currency);
        expect(actual).toBeObject();
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

    it('should include additional options', () => {
      const locale = 'en-US';
      const actual = resolveCurrencyFormat(locale);
      expect(actual).toHaveProperty('groupDelimiter', ',');
      expect(actual).toHaveProperty('decimalDelimiter', '.');
      expect(actual).toHaveProperty('currencySymbol', '$');
      expect(actual).toHaveProperty('currencyPosition', 'prefix');
    });

    it('should accept a custom currency', () => {
      const locale = 'xx-XX';
      const currency = 'XXX';
      const actual = resolveCurrencyFormat(locale, currency);
      expect(actual).toBeObject();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'currency',
        currency,
      });
    });
  });
});
