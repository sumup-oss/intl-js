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
  getFormat,
  getCurrencyFormat,
} from '.';

describe('Format', () => {
  describe('number', () => {
    it.each([
      [123456.789, 'PT', '123.456,789'],
      [123456.789, ['CN', 'PT'], '123.456,789'],
    ])('should format %f for %o', (number, locales, expected) => {
      const actual = format(number, locales);
      expect(actual).toBe(expected);
    });
  });

  describe('currency', () => {
    it.each([
      [123456.789, 'PT', '€ 123.456,79'],
      [123456.789, ['CN', 'PT'], '€ 123.456,79'],
    ])('should format %f for %o', (number, locales, expected) => {
      const actual = formatCurrency(number, locales);
      expect(actual).toBe(expected);
    });
  });
});

describe('Format to parts', () => {
  describe('number', () => {
    it.each([
      [123456.789, 'PT'],
      [123456.789, ['CN', 'PT']],
    ])('should format %f for %o', (number, locales) => {
      const actual = formatToParts(number, locales);
      expect(actual).toMatchSnapshot();
    });
  });

  describe('currency', () => {
    it.each([
      [123456.789, 'PT'],
      [123456.789, ['CN', 'PT']],
    ])('should format %f for %o', (number, locales) => {
      const actual = formatCurrencyToParts(number, locales);
      expect(actual).toMatchSnapshot();
    });
  });
});

describe('Get format', () => {
  describe('number', () => {
    it.each([['PT'], [['en-US', 'pt-PT']]])(
      'should get format for %o',
      (locales) => {
        const actual = getFormat(locales);
        expect(actual).toMatchSnapshot();
      },
    );
  });

  describe('currency', () => {
    it.each([['PT'], [['en-US', 'pt-PT']]])(
      'should get format for %o',
      (locales) => {
        const actual = getCurrencyFormat(locales);
        expect(actual).toMatchSnapshot();
      },
    );
  });
});
