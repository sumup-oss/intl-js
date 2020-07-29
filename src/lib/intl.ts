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

import { Locale } from '../types';

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
    return typeof Intl.NumberFormat.prototype.formatToParts !== 'undefined';
  } catch (error) {
    return false;
  }
})();

/**
 * @deprecated Whether the `Intl` and `Intl.NumberFormat` APIs
 * are supported by the runtime.
 */
export const isIntlSupported = isNumberFormatSupported;

let memoizedIntl: (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormat;

export const memoizeIntl: () => (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormat = () => {
  if (!memoizedIntl) {
    memoizedIntl = memoizeFormatConstructor(Intl.NumberFormat);
  }
  return memoizedIntl;
};

export function resolveLocale(locales?: Locale | Locale[]): Locale | Locale[] {
  if (locales && locales.length >= 0) {
    return locales;
  }
  const getNumberFormat = memoizeIntl();
  const numberFormat = getNumberFormat();
  return numberFormat.resolvedOptions().locale;
}
