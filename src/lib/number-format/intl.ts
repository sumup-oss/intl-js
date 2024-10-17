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

import memoizeFormatConstructor from 'intl-format-cache';

import type { Locale } from '../../types/index.js';

/**
 * Whether the `Intl` and `Intl.NumberFormat` APIs
 * are supported by the runtime.
 */
export const isNumberFormatSupported = (() => {
  try {
    return (
      typeof Intl !== 'undefined' && typeof Intl.NumberFormat !== 'undefined'
    );
  } catch (error) {
    return false;
  }
})();

/**
 * Whether the `Intl`, `Intl.NumberFormat`, and
 * `Intl.NumberFormat.formatToParts` APIs are supported by the runtime.
 */
export const isNumberFormatToPartsSupported = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return typeof Intl.NumberFormat.prototype.formatToParts !== 'undefined';
  } catch (error) {
    return false;
  }
})();

// @ts-expect-error intl-format-cache is bundled in a non-standard way.
export const getNumberFormat = memoizeFormatConstructor(Intl.NumberFormat) as (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormat;

export function resolveLocale(locales?: Locale | Locale[]): Locale | Locale[] {
  if (locales && locales.length >= 0) {
    return locales;
  }
  const numberFormat = getNumberFormat();
  return numberFormat.resolvedOptions().locale;
}
