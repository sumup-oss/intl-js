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

/* eslint-disable no-irregular-whitespace */

import {
  format,
  formatCurrency,
  formatToParts,
  formatCurrencyToParts,
  resolveFormat,
  resolveCurrencyFormat,
  CURRENCIES,
} from '.';

const locales: (string | string[])[] = [
  ...Object.keys(CURRENCIES),
  'de-DE',
  'es-US',
  ['DE', 'US'],
  ['de-DE', 'es-US'],
];
const number = 123456.789;

describe('Format', () => {
  describe('number', () => {
    it.each(locales)('should format a number for %o', (locale) => {
      const actual = format(number, locale);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('currency', () => {
    it.each(locales)('should format a currency for %o', (locale) => {
      const actual = formatCurrency(number, locale);
      expect(actual).toMatchSnapshot();
    });
  });
});

describe('Format to parts', () => {
  describe('number', () => {
    it.each(locales)('should format a number for %o', (locale) => {
      const actual = formatToParts(number, locale);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('currency', () => {
    it.each(locales)('should format a currency for %o', (locale) => {
      const actual = formatCurrencyToParts(number, locale);
      expect(actual).toMatchSnapshot();
    });
  });
});

describe('Get format', () => {
  describe('number', () => {
    it.each(locales)('should get the format for %o', (locale) => {
      const actual = resolveFormat(locale);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('currency', () => {
    it.each(locales)('should get the currency format for %o', (locale) => {
      const actual = resolveCurrencyFormat(locale);
      expect(actual).toMatchSnapshot();
    });
  });
});
