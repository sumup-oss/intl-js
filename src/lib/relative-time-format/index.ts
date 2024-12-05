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
import { formatNumber, formatNumberToParts } from '../number-format/index.js';

import {
  getRelativeTimeFormat,
  isRelativeTimeFormatSupported,
} from './intl.js';

export { isRelativeTimeFormatSupported };

/**
 * Formats a relative time with support for various [styles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#style).
 *
 * @example
 * import { formatRelativeTime } from '@sumup-oss/intl';
 *
 * formatRelativeTime(1, 'day', 'de-DE'); // 'in 1 Tag'
 * formatRelativeTime(7, 'years', ['pt-BR', 'pt']); // 'em 7 anos'
 * formatRelativeTime(-5, 'months', 'en-GB', {
 *   style: 'narrow',
 * }); // '5 mo ago'
 *
 * @remarks
 * In runtimes that don't support the `Intl.RelativeTimeFormat` API,
 * the relative time is formatted using the `Intl.NumberFormat` API instead.
 *
 * @category Date & Time
 */
export const formatRelativeTime = formatRelativeTimeFactory();

function formatRelativeTimeFactory(): (
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locales?: Locale | Locale[],
  options?: Intl.RelativeTimeFormatOptions,
) => string {
  if (!isRelativeTimeFormatSupported) {
    return (value, unit, locales, options) => {
      const numberFormat = convertToNumberFormat(value, unit, options);
      return formatNumber(numberFormat.value, locales, numberFormat.options);
    };
  }

  return (value, unit, locales, options) => {
    const relativeTimeFormat = getRelativeTimeFormat(locales, options);
    return relativeTimeFormat.format(value, unit);
  };
}

/**
 * Formats a relative time to parts with support for various [styles](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat#style).
 *
 * @example
 * import { formatRelativeTimeToParts } from '@sumup-oss/intl';
 *
 * formatRelativeTimeToParts(1, 'day', 'de-DE');
 * // [
 * //  { "type": "literal", "value": "in " },
 * //  { "type": "integer", "unit": "day", "value": "1" },
 * //  { "type": "literal", "value": " Tag" }
 * // ]
 * formatRelativeTimeToParts(7, 'years', ['pt-BR', 'pt']);
 * // [
 * //   { "type": "literal", "value": "em " },
 * //   { "type": "integer", "unit": "year", "value": "7" },
 * //   { "type": "literal", "value": " anos" }
 * // ]
 * formatRelativeTimeToParts(-5, 'months', 'en-GB', {
 *   style: 'narrow',
 * });
 * // [
 * //   { "type": "integer", "unit": "month", "value": "5" },
 * //   { "type": "literal", "value": " mo ago" }
 * // ]
 *
 * @remarks
 * In runtimes that don't support the `Intl.RelativeTimeFormat` API,
 * the relative time is formatted using the `Intl.NumberFormat` API instead.
 *
 * @category Date & Time
 */
export const formatRelativeTimeToParts = formatRelativeTimeToPartsFactory();

function formatRelativeTimeToPartsFactory(): (
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  locales?: Locale | Locale[],
  options?: Intl.RelativeTimeFormatOptions,
) => Intl.RelativeTimeFormatPart[] {
  if (!isRelativeTimeFormatSupported) {
    return (value, unit, locales, options) => {
      // In runtimes that don't support formatting to parts, the relative time
      // is formatted using the `Intl.NumberFormat` API instead.
      const numberFormat = convertToNumberFormat(value, unit, options);
      const numberFormatParts = formatNumberToParts(
        numberFormat.value,
        locales,
        numberFormat.options,
      );

      // Smooth over the subtle differences between NumberFormatPart and RelativeTimeFormatPart
      return numberFormatParts.map((part) => {
        if (part.type === 'integer') {
          return { ...part, unit: numberFormat.options.unit };
        }
        if (part.type === 'unit') {
          return { ...part, type: 'literal' };
        }
        return part;
      }) as Intl.RelativeTimeFormatPart[];
    };
  }

  return (value, unit, locales, options) => {
    const relativeTimeFormat = getRelativeTimeFormat(locales, options);
    return relativeTimeFormat.formatToParts(value, unit);
  };
}

/**
 * Resolves the locale and collation options that are used to format a relative time.
 *
 * @example
 * import { resolveRelativeTimeFormat } from '@sumup-oss/intl';
 *
 * resolveRelativeTimeFormat('de-DE');
 * // {
 * //   "locale": "de-DE",
 * //   "numberingSystem": "latn",
 * //   "numeric": "always",
 * //   "style": "long",
 * // }
 * resolveRelativeTimeFormat(['pt-BR', 'pt']);
 * // {
 * //   "locale": "pt-BR",
 * //   "numberingSystem": "latn",
 * //   "numeric": "always",
 * //   "style": "long",
 * // }
 * resolveRelativeTimeFormat('en-GB', {
 *   style: 'narrow',
 * });
 * // {
 * //   "locale": "en-GB",
 * //   "numberingSystem": "latn",
 * //   "numeric": "always",
 * //   "style": "narrow",
 * // }
 *
 * @remarks
 * In runtimes that don't support the `Intl.RelativeTimeFormat.resolvedOptions` API,
 * `null` is returned.
 *
 * @category Date & Time
 */
export const resolveRelativeTimeFormat = resolveRelativeTimeFormatFactory();

function resolveRelativeTimeFormatFactory(): (
  locales?: Locale | Locale[],
  options?: Intl.RelativeTimeFormatOptions,
) => null | Intl.ResolvedRelativeTimeFormatOptions {
  if (!isRelativeTimeFormatSupported) {
    return () => null;
  }

  return (locales, options) => {
    const relativeTimeFormat = getRelativeTimeFormat(locales, options);
    return relativeTimeFormat.resolvedOptions();
  };
}

function convertToNumberFormat(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  options: Intl.RelativeTimeFormatOptions | undefined,
): { value: number; options: Intl.NumberFormatOptions } {
  const style = 'unit';
  const unitDisplay = options?.style || 'long';

  // Intl.NumberFormat doesn't support the 'quarter' unit
  if (unit.startsWith('quarter')) {
    return { value: value * 3, options: { unit: 'month', style, unitDisplay } };
  }

  const numberFormatUnits = [
    'year',
    'month',
    'week',
    'day',
    'hour',
    'minute',
    'second',
  ];
  // Intl.NumberFormat only supports singular unit names
  const singularUnit = numberFormatUnits.find((supportedUnit) =>
    unit.startsWith(supportedUnit),
  );
  return { value, options: { unit: singularUnit, style, unitDisplay } };
}
