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

import { normalize } from './numbers';

describe('Numbers', () => {
  describe('normalize', () => {
    const testCases: [string, string][] = [
      ['\xA0', ','],
      ['.', ','],
      ["'", '.'],
      [',', '.'],
      ['\xA0', '.'],
    ];
    it.each(testCases)(
      'should normalize 1%s000 to a decimal number',
      (thousand) => {
        const value = `1${thousand}000`;
        const expected = 1000;
        const actual = normalize(value);
        expect(actual).toBe(expected);
      },
    );

    it.each(testCases)(
      'should normalize 1%s000%s5 to a decimal number',
      (thousand, decimal) => {
        const value = `1${thousand}000${decimal}5`;
        const expected = 1000.5;
        const actual = normalize(value);
        expect(actual).toBe(expected);
      },
    );

    it.each(testCases)(
      'should normalize 1%s000%s50 to a decimal number',
      (thousand, decimal) => {
        const value = `1${thousand}000${decimal}50`;
        const expected = 1000.5;
        const actual = normalize(value);
        expect(actual).toBe(expected);
      },
    );

    it.each(testCases)(
      'should normalize 1%s000%s00 to a decimal number',
      (thousand, decimal) => {
        const value = `1${thousand}000${decimal}00`;
        const expected = 1000;
        const actual = normalize(value);
        expect(actual).toBe(expected);
      },
    );
  });
});
