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

import {
  formatCurrency,
  formatCurrencyToParts,
  formatNumber,
  formatNumberToParts,
  resolveCurrencyFormat,
  resolveNumberFormat,
} from '..';

import { number } from './shared';

jest.mock('../intl', () => ({
  ...jest.requireActual<typeof import('../intl')>('../intl'),
  isNumberFormatSupported: false,
  isNumberFormatToPartsSupported: false,
}));

const locale = 'xx-XX';

describe('Numbers', () => {
  describe('when Intl.NumberFormat is unsupported', () => {
    it('should format a number', () => {
      const actual = formatNumber(number, locale);
      expect(actual).toMatchInlineSnapshot('"123,456.789"');
    });

    it('should format a number to a single integer part', () => {
      const parts = formatNumberToParts(number, locale);
      expect(parts).toHaveLength(1);
      expect(parts[0]).toHaveProperty('type', 'integer');
      expect(parts[0]).toHaveProperty('value', '123,456.789');
    });

    it('should return `null` for the number format', () => {
      const actual = resolveNumberFormat(locale);
      expect(actual).toBeNull();
    });
  });
});

describe('Currency values', () => {
  describe('when Intl.NumberFormat is unsupported', () => {
    it('should format a currency value as a number', () => {
      const actual = formatCurrency(number, locale);
      expect(actual).toMatchInlineSnapshot('"123,456.789"');
    });

    it('should format a currency value to a single integer part', () => {
      const parts = formatCurrencyToParts(number, locale);
      expect(parts).toHaveLength(1);
      expect(parts[0]).toHaveProperty('type', 'integer');
      expect(parts[0]).toHaveProperty('value', '123,456.789');
    });

    it('should return `null` for the currency format', () => {
      const actual = resolveCurrencyFormat(locale);
      expect(actual).toBeNull();
    });
  });
});
