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

import { resolveFormat, resolveCurrencyFormat } from '..';

import { locales } from './shared';

describe('Resolve format', () => {
  describe('number', () => {
    it.each(locales)('should get the format for %o', (locale) => {
      const actual = resolveFormat(locale);
      expect(actual).toBeObject();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'decimal',
      });
    });
  });

  describe('currency', () => {
    it.each(locales)('should get the currency format for %o', (locale) => {
      const actual = resolveCurrencyFormat(locale);
      expect(actual).toBeObject();
      expect(Intl.NumberFormat).toHaveBeenCalledWith(locale, {
        style: 'currency',
        currency: expect.any(String),
      });
    });
  });
});
