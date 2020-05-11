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

import {
  getDecimalSeparator,
  getGroupSeparator,
  getCurrencySymbol,
} from './parts';

describe('Parts', () => {
  describe('getDecimalSeparator', () => {
    it.each([
      ['PT', ','],
      ['US', '.'],
      [['PT', 'US'], ','],
    ])('should get the decimal separator for %o', (locales, expected) => {
      const actual = getDecimalSeparator(locales);
      expect(actual).toBe(expected);
    });
  });

  describe('getGroupSeparator', () => {
    it.each([
      ['PT', '.'],
      ['US', ','],
      [['PT', 'US'], '.'],
    ])('should get the group separator for %o', (locales, expected) => {
      const actual = getGroupSeparator(locales);
      expect(actual).toBe(expected);
    });
  });

  describe('getCurrencySymbol', () => {
    it.each([
      ['PT', '€'],
      ['US', '$'],
      [['PT', 'US'], '€'],
    ])('should get the currency symbol for %o', (locales, expected) => {
      const actual = getCurrencySymbol(locales);
      expect(actual).toBe(expected);
    });
  });
});
