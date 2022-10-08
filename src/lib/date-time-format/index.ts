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

import type { Locale } from '../../types';
import { DATE_STYLES, TIME_STYLES } from '../../data/date-time-styles';

import {
  getDateTimeFormat,
  isDateTimeFormatSupported,
  isDateTimeFormatToPartsSupported,
  isDateTimeStyleSupported,
} from './intl';

export { isDateTimeFormatSupported, isDateTimeFormatToPartsSupported };

/**
 * Formats a `Date` with support for various
 * [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle)
 * and [time](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timestyle) styles.
 */
export const formatDateTime = formatDateTimeFactory();

/**
 * Formats a `Date` with support for various
 * [date styles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle).
 */
export function formatDate(
  date: Date, // in UTC
  locales?: Locale | Locale[],
  dateStyle: Intl.DateTimeFormatOptions['dateStyle'] = 'short',
) {
  return formatDateTime(date, locales, { dateStyle });
}

/**
 * Formats a `Date` with support for various
 * [time styles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle).
 */
export function formatTime(
  date: Date, // in UTC
  locales?: Locale | Locale[],
  timeStyle: Intl.DateTimeFormatOptions['timeStyle'] = 'short',
) {
  return formatDateTime(date, locales, { timeStyle });
}

function formatDateTimeFactory(): (
  date: Date, // in UTC
  locales?: Locale | Locale[],
  options?: Intl.DateTimeFormatOptions,
) => string {
  if (!isDateTimeFormatSupported) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (date, _locales, options) => {
      const fallbackOptions = getFallbackOptions(options);
      const includeDate = hasOptions(fallbackOptions, ['day', 'month', 'year']);
      const includeTime = hasOptions(fallbackOptions, [
        'hour',
        'minute',
        'second',
      ]);

      if (includeDate && includeTime) {
        return date.toLocaleString();
      }
      if (includeDate) {
        return date.toLocaleDateString();
      }
      if (includeTime) {
        return date.toLocaleTimeString();
      }
      return date.toLocaleString();
    };
  }

  return (date, locales, options) => {
    const fallbackOptions = getFallbackOptions(options);
    const dateTimeFormat = getDateTimeFormat(locales, fallbackOptions);
    return dateTimeFormat.format(date);
  };
}

/**
 * Formats a `Date` to parts with support for various
 * [date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle)
 * and [time](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#timestyle) styles.
 */
export const formatDateTimeToParts = formatDateTimeToPartsFactory();

function formatDateTimeToPartsFactory(): (
  date: Date, // in UTC
  locales?: Locale | Locale[],
  options?: Intl.DateTimeFormatOptions,
) => (Intl.DateTimeFormatPart | { type: 'date'; value: string })[] {
  if (!isDateTimeFormatToPartsSupported) {
    return (date, locales, options) => {
      // In runtimes that don't support formatting to parts yet, the date is
      // localized and returned as a single string literal part.
      const value = formatDateTime(date, locales, options);
      return [{ type: 'literal', value }];
    };
  }

  return (date, locales, options) => {
    const fallbackOptions = getFallbackOptions(options);
    const dateTimeFormat = getDateTimeFormat(locales, fallbackOptions);
    return dateTimeFormat.formatToParts(date);
  };
}

/**
 * Resolves the locale and collation options that are used to format a `Date`.
 */
export const resolveDateTimeFormat = resolveDateTimeFormatFactory();

function resolveDateTimeFormatFactory(): (
  locales?: Locale | Locale[],
  options?: Intl.DateTimeFormatOptions,
) => null | Intl.ResolvedDateTimeFormatOptions {
  if (!isDateTimeFormatSupported) {
    return () => null;
  }

  return (locales, options) => {
    const fallbackOptions = getFallbackOptions(options);
    const dateTimeFormat = getDateTimeFormat(locales, fallbackOptions);
    return dateTimeFormat.resolvedOptions();
  };
}

function hasOptions(
  options: Intl.DateTimeFormatOptions | undefined,
  keys: (keyof Intl.DateTimeFormatOptions)[],
) {
  return options ? keys.some((key) => Boolean(options[key])) : false;
}

// The `dateStyle` and `timeStyle` options were added to the spec recently.
// In runtimes that don't support them yet, the styles are approximated using
// fallback options.
function getFallbackOptions(options?: Intl.DateTimeFormatOptions) {
  if (
    !options ||
    isDateTimeStyleSupported ||
    !hasOptions(options, ['dateStyle', 'timeStyle'])
  ) {
    return options;
  }

  const { dateStyle, timeStyle, ...rest } = options;

  let fallbackOptions = rest;

  if (dateStyle) {
    fallbackOptions = { ...fallbackOptions, ...DATE_STYLES[dateStyle] };
  }
  if (timeStyle) {
    fallbackOptions = { ...fallbackOptions, ...TIME_STYLES[timeStyle] };
  }
  return fallbackOptions;
}
