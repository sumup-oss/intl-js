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

import { vi, describe, it, expect } from 'vitest';

import {
  formatRelativeTime,
  formatRelativeTimeToParts,
  resolveRelativeTimeFormat,
} from '../index.js';

import { relativeTimes } from './shared.js';

vi.mock('../intl', async () => {
  const intl = await vi.importActual('../intl');
  return {
    ...intl,
    isRelativeTimeFormatSupported: false,
  };
});

const locale = 'xx-XX';

describe('Relative times', () => {
  describe('when Intl.RelativeTimeFormat is unsupported', () => {
    it.each(relativeTimes)(
      'should format %s %s as a relative time',
      (value, unit) => {
        const actual = formatRelativeTime(value, unit, locale);
        expect(actual).toMatchSnapshot();
      },
    );

    it('should format a relative time to numeric parts', () => {
      const [value, unit] = relativeTimes[0];
      const parts = formatRelativeTimeToParts(value, unit, locale);
      expect(parts).toHaveLength(10);
    });

    it('should return `null` for the relative time format', () => {
      const actual = resolveRelativeTimeFormat(locale);
      expect(actual).toBeNull();
    });
  });
});
