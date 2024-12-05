/**
 * Copyright 2024, SumUp Ltd.
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

import type { Locale } from '../../types/index.js';
import { memoize } from '../memoize.js';

/**
 * Whether the `Intl` and `Intl.DateTimeFormat` APIs
 * are supported by the runtime.
 */
export const isRelativeTimeFormatSupported = (() => {
  try {
    return (
      typeof Intl !== 'undefined' &&
      typeof Intl.RelativeTimeFormat !== 'undefined'
    );
  } catch (error) {
    return false;
  }
})();

export const getRelativeTimeFormat = memoize(Intl.RelativeTimeFormat) as (
  locales?: Locale | Locale[],
  options?: Intl.RelativeTimeFormatOptions,
) => Intl.RelativeTimeFormat;
