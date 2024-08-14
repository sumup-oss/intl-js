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
 *
 * @example
 * import { formatDateTime } from '@sumup-oss/intl';
 *
 * formatDateTime(new Date(2000, 1, 1), 'de-DE'); // '1.2.2000'
 * formatDateTime(new Date(2000, 1, 1), ['ban', 'id']); // '1/2/2000'
 * formatDateTime(new Date(2000, 1, 1, 12, 30), 'en-GB', {
 *   year: 'numeric',
 *   month: 'short',
 *   day: 'numeric',
 *   hour: '2-digit',
 *   minute: '2-digit',
 * }); // 1 Feb 2000, 12:30
 *
 * @remarks
 * In runtimes that don't support the `Intl.DateTimeFormat` API, the date is
 * formatted using the `Date.toLocale(Date|Time)String` API.
 *
 * In runtimes that don't support the `dateStyle` and `timeStyle` options, the
 * styles are approximated using fallback options.
 *
 * @category Date & Time
 */
export const formatDateTime = formatDateTimeFactory();

/**
 * Formats a `Date` with support for various
 * [date styles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#datestyle).
 *
 * @example
 * import { formatDate } from '@sumup-oss/intl';
 *
 * const date = new Date(2000, 1, 1);
 * const locale = 'en-GB';
 *
 * formatDate(date, locale, 'short'); // '01/02/2000'
 * formatDate(date, locale, 'medium'); // '1 Feb 2000'
 * formatDate(date, locale, 'long'); // '1 February 2000'
 * formatDate(date, locale, 'full'); // 'Tuesday, 1 February 2000'
 *
 * @remarks
 * In runtimes that don't support the `Intl.DateTimeFormat` API, the date is
 * formatted using the `Date.toLocale(Date|Time)String` API.
 *
 * In runtimes that don't support the `dateStyle` option, the styles are
 * approximated using fallback options.
 *
 * @category Date & Time
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
 *
 * @example
 * import { formatTime } from '@sumup-oss/intl';
 *
 * const time = new Date(2000, 1, 1, 9, 55);
 * const locale = 'en-GB';
 *
 * formatTime(time, locale, 'short'); // '09:55'
 * formatTime(time, locale, 'medium'); // '09:55:00'
 * formatTime(time, locale, 'long'); // '09:55:00 CET'
 * formatTime(time, locale, 'full'); // '09:55:00 Central European Standard Time'
 *
 * @remarks
 * In runtimes that don't support the `Intl.DateTimeFormat` API, the date is
 * formatted using the `Date.toLocale(Date|Time)String` API.
 *
 * In runtimes that don't support the `timeStyle` option, the styles are
 * approximated using fallback options.
 *
 * @category Date & Time
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
      const includeDate = hasOptions(fallbackOptions, [
        'dateStyle',
        'day',
        'month',
        'year',
      ]);
      const includeTime = hasOptions(fallbackOptions, [
        'timeStyle',
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
 *
 * @example
 * import { formatDateTimeToParts } from '@sumup-oss/intl';
 *
 * const time = new Date(2000, 1, 1, 9, 55);
 *
 * formatDateTimeToParts(date, 'de-DE');
 * // [
 * //   { type: 'day', value: '1' },
 * //   { type: 'literal', value: '.' },
 * //   { type: 'month', value: '2' },
 * //   { type: 'literal', value: '.' },
 * //   { type: 'year', value: '2000' },
 * // ]
 * formatDateTimeToParts(date, ['ban', 'id']);
 * // [
 * //   { type: 'day', value: '1' },
 * //   { type: 'literal', value: '/' },
 * //   { type: 'month', value: '2' },
 * //   { type: 'literal', value: '/' },
 * //   { type: 'year', value: '2000' },
 * // ]
 * formatDateTimeToParts(date, 'en-GB', {
 *   year: 'numeric',
 *   month: 'short',
 *   day: 'numeric',
 * });
 * // [
 * //   ({ type: 'day', value: '1' },
 * //   { type: 'literal', value: ' ' },
 * //   { type: 'month', value: 'Feb' },
 * //   { type: 'literal', value: ' ' },
 * //   { type: 'year', value: '2000' })
 * // ]
 *
 * @remarks
 * In runtimes that don't support the `Intl.DateTimeFormat.formatToParts` API,
 * the date is localized and returned as a single string literal part.
 *
 * @category Date & Time
 */
export const formatDateTimeToParts = formatDateTimeToPartsFactory();

function formatDateTimeToPartsFactory(): (
  date: Date, // in UTC
  locales?: Locale | Locale[],
  options?: Intl.DateTimeFormatOptions,
) => (Intl.DateTimeFormatPart | { type: 'date'; value: string })[] {
  if (!isDateTimeFormatToPartsSupported) {
    return (date, locales, options) => {
      // In runtimes that don't support formatting to parts, the date is
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
 *
 * @example
 * import { resolveDateTimeFormat } from '@sumup-oss/intl';
 *
 * resolveDateTimeFormat();
 * // {
 * //   'locale': 'en-DE',
 * //   'calendar': 'gregory',
 * //   'numberingSystem': 'latn',
 * //   'timeZone': 'Europe/Berlin',
 * //   'year': 'numeric',
 * //   'month': '2-digit',
 * //   'day': '2-digit'
 * // }
 * resolveDateTimeFormat(['ban', 'id']);
 * // {
 * //   'locale': 'id',
 * //   'calendar': 'gregory',
 * //   'numberingSystem': 'latn',
 * //   'timeZone': 'Europe/Berlin',
 * //   'year': 'numeric',
 * //   'month': 'numeric',
 * //   'day': 'numeric'
 * // }
 * resolveDateTimeFormat('en-GB', {
 *   year: 'numeric',
 *   month: 'short',
 *   day: 'numeric',
 * });
 * // {
 * //   'locale': 'en-GB',
 * //   'calendar': 'gregory',
 * //   'numberingSystem': 'latn',
 * //   'timeZone': 'Europe/Berlin',
 * //   'year': 'numeric',
 * //   'month': 'short',
 * //   'day': 'numeric'
 * // }
 *
 * @remarks
 * In runtimes that don't support the `Intl.DateTimeFormat.resolvedOptions` API,
 * `null` is returned.
 *
 * @category Date & Time
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
// In runtimes that don't support them, the styles are approximated using
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
