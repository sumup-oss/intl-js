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

import { Intl as IntlWithTemporal } from 'temporal-polyfill';
import memoizeFormatConstructor from 'intl-format-cache';

import { Locale } from '../../types';

/**
 * Whether the `Intl` and `Intl.DateTimeFormat` APIs
 * are supported by the runtime.
 */
export const isDateTimeFormatSupported = (() => {
  try {
    return (
      typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat !== 'undefined'
    );
  } catch (error) {
    return false;
  }
})();

/**
 * Whether the `Intl`, `Intl.DateTimeFormat`, and
 * `Intl.DateTimeFormat.formatToParts` APIs are supported by the runtime.
 */
export const isDateTimeFormatToPartsSupported = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return typeof Intl.DateTimeFormat.prototype.formatToParts !== 'undefined';
  } catch (error) {
    return false;
  }
})();

/**
 * Whether the `dateStyle` and `timeStyle` DateTimeFormat options
 * are supported by the runtime.
 */
export const isDateTimeStyleSupported = (() => {
  try {
    const options = new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).resolvedOptions() as Intl.DateTimeFormatOptions;
    return Boolean(options.dateStyle && options.timeStyle);
  } catch (error) {
    return false;
  }
})();

export const getDateTimeFormat = memoizeFormatConstructor(
  IntlWithTemporal.DateTimeFormat,
) as (
  locales?: Locale | Locale[],
  options?: Intl.DateTimeFormatOptions,
) => IntlWithTemporal.DateTimeFormat;
