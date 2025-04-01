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

import type { SpyImpl } from 'tinyspy';
import { describe, expect, it } from 'vitest';

import { formatRelativeTime } from '../index.js';

import { locales, relativeTimes } from './shared.js';

const spy = Intl.RelativeTimeFormat as unknown as SpyImpl;

describe('Relative times', () => {
  describe('formatRelativeTime', () => {
    it.each(locales)('should format a relative time for %o', (locale) => {
      const index = locales.indexOf(locale);
      const [value, unit] = relativeTimes[0];
      const actual = formatRelativeTime(value, unit, locale);
      expect(actual).toBeString();
      expect(spy.calls[index]).toEqual([locale, undefined]);
    });

    it.each(relativeTimes)('should format %s %s', (value, unit, expected) => {
      const locale = locales[0];
      const actual = formatRelativeTime(value, unit, locale);
      expect(actual).toBe(expected);
    });
  });
});
