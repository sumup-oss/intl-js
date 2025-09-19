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

import type {
  Currency,
  Locale,
  NumberFormat,
  NumericOptions,
} from '../../types/index.js';
import { findIndex } from '../find-index.js';

import { getCurrencyOptions } from './currencies.js';
import {
  getNumberFormat,
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
} from './intl.js';
import { getNumberOptions } from './numbers.js';

export { isNumberFormatSupported, isNumberFormatToPartsSupported };

type GetOptions = (
  locales: Locale | Locale[],
  // biome-ignore lint/suspicious/noExplicitAny: A more specific type doesn't work here
  ...args: any[]
) => NumericOptions;

/**
 * Formats a number with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 *
 * @example
 * import { formatNumber } from '@sumup-oss/intl';
 *
 * formatNumber(12345.67, 'de-DE'); // '12.345,67'
 * formatNumber(-0.89, ['ban', 'id']); // '-0,89'
 * formatNumber(16, 'en-GB', {
 *   style: 'unit',
 *   unit: 'liter',
 *   unitDisplay: 'long',
 * }); // 16 litres
 *
 * @remarks
 * In runtimes that don't support the `Intl.NumberFormat` API, the number is
 * formatted using the `Number.toLocaleString` API.
 *
 * @category Number
 */
export const formatNumber = formatNumberFactory(getNumberOptions) as (
  value: number,
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => string;

/**
 * Formats a number in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 *
 * @example
 * import { formatCurrency } from '@sumup-oss/intl';
 *
 * formatCurrency(12345.67, 'de-DE'); // '12.345,67 €'
 * formatCurrency(89, 'ja-JP', 'JPY'); // '￥89'
 * formatCurrency(16, 'en-GB', null, { currencyDisplay: 'name' }); // '16.00 British pounds'
 *
 * @remarks
 * In runtimes that don't support the `Intl.NumberFormat` API, the currency is
 * formatted using the `Number.toLocaleString` API.
 *
 * The COP and HUF currencies are formatted without decimals.
 *
 * @category Currency
 */
export const formatCurrency = formatNumberFactory(getCurrencyOptions) as (
  value: number,
  locales?: Locale | Locale[],
  currency?: Currency,
  options?: Intl.NumberFormatOptions,
) => string;

function formatNumberFactory<T extends GetOptions>(
  getOptions: T,
): (value: number, ...args: Parameters<T>) => string {
  if (!isNumberFormatSupported) {
    return (value, _locales, ..._args): string => value.toLocaleString();
  }

  return (value, locales, ...args): string => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.format(value);
  };
}

/**
 * Formats a number with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 *
 * @example
 * import { formatNumberToParts } from '@sumup-oss/intl';
 *
 * formatNumberToParts(12345.67, 'de-DE');
 * // [
 * //   { type: "integer", value: "12" },
 * //   { type: "group", value: "." },
 * //   { type: "integer", value: "345" },
 * //   { type: "decimal", value: "," },
 * //   { type: "fraction", value: "67" },
 * // ]
 *
 * formatNumberToParts(-0.89, ['ban', 'id']);
 * // [
 * //   { type: "minusSign", value: "-" },
 * //   { type: "integer", value: "0" },
 * //   { type: "decimal", value: "," },
 * //   { type: "fraction", value: "89" },
 * // ]
 *
 * formatNumberToParts(16, 'en-GB', {
 *   style: 'unit',
 *   unit: 'liter',
 *   unitDisplay: 'long',
 * });
 * // [
 * //   { type: "integer", value: "16" },
 * //   { type: "literal", value: " " },
 * //   { type: "unit", value: "litres" },
 * // ]
 *
 * @remarks
 * In runtimes that don't support the `Intl.NumberFormat.formatToParts` API,
 * the number is localized and returned as a single integer part.
 *
 * @category Number
 */
export const formatNumberToParts = formatNumberToPartsFactory(
  getNumberOptions,
) as (
  value: number,
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormatPart[];

/**
 * Formats a number in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 *
 * @example
 * import { formatCurrencyToParts } from '@sumup-oss/intl';
 *
 * formatCurrencyToParts(12345.67, 'de-DE');
 * // [
 * //   { type: "integer", value: "12" },
 * //   { type: "group", value: "." },
 * //   { type: "integer", value: "345" },
 * //   { type: "decimal", value: "," },
 * //   { type: "fraction", value: "67" },
 * //   { type: "literal", value: " " },
 * //   { type: "currency", value: "€" },
 * // ]
 *
 * formatCurrencyToParts(-89, 'ja-JP', 'JPY');
 * // [
 * //   { type: "minusSign", value: "-" },
 * //   { type: "currency", value: "￥" },
 * //   { type: "integer", value: "89" },
 * // ]
 *
 * formatCurrencyToParts(16, 'en-GB', null, { currencyDisplay: 'name' });
 * // [
 * //   { type: "integer", value: "16" },
 * //   { type: "decimal", value: "." },
 * //   { type: "fraction", value: "00" },
 * //   { type: "literal", value: " " },
 * //   { type: "currency", value: "British pounds" },
 * // ]
 *
 * @remarks
 * In runtimes that don't support the `Intl.NumberFormat.formatToParts` API,
 * the currency is localized and returned as a single integer part.
 *
 * The COP and HUF currencies are formatted without decimals.
 *
 * @category Currency
 */
export const formatCurrencyToParts = formatNumberToPartsFactory(
  getCurrencyOptions,
) as (
  value: number,
  locales?: Locale | Locale[],
  currency?: Currency,
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormatPart[];

function formatNumberToPartsFactory<T extends GetOptions>(
  getOptions: T,
): (value: number, ...args: Parameters<T>) => Intl.NumberFormatPart[] {
  if (!isNumberFormatToPartsSupported) {
    return (value, _locales, ..._args): Intl.NumberFormatPart[] => [
      { type: 'integer', value: value.toLocaleString() },
    ];
  }

  return (value, locales, ...args): Intl.NumberFormatPart[] => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.formatToParts(value);
  };
}

/**
 * Resolves the locale and collation options that are used to format a number.
 *
 * @example
 * import { resolveNumberFormat } from '@sumup-oss/intl';
 *
 * resolveNumberFormat();
 * // {
 * //   'locale': 'en-US',
 * //   'numberingSystem': 'latn',
 * //   'style': 'decimal',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 0,
 * //   'maximumFractionDigits': 3,
 * //   'useGrouping': true,
 * //   'groupDelimiter': ',',
 * //   'decimalDelimiter': '.',
 * // }
 *
 * resolveNumberFormat(['ban', 'id']);
 * // {
 * //   'locale': 'id',
 * //   'numberingSystem': 'latn',
 * //   'style': 'decimal',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 0,
 * //   'maximumFractionDigits': 3,
 * //   'useGrouping': true,
 * //   'groupDelimiter': '.',
 * //   'decimalDelimiter': ',',
 * // }
 *
 * resolveNumberFormat('en-GB', {
 *   style: 'unit',
 *   unit: 'liter',
 *   unitDisplay: 'long',
 * });
 * // {
 * //   'locale': 'en-GB',
 * //   'numberingSystem': 'latn',
 * //   'style': 'unit',
 * //   'unit': 'liter',
 * //   'unitDisplay': 'long',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 0,
 * //   'maximumFractionDigits': 3,
 * //   'useGrouping': true,
 * //   'notation': 'standard',
 * //   'signDisplay': 'auto',
 * //   'groupDelimiter': ',',
 * //   'decimalDelimiter': '.',
 * // }
 *
 * @remarks
 * For convenience, `groupDelimiter` and`decimalDelimiter` are returned in
 *  addition to the `Intl.ResolvedNumberFormatOptions`.
 *
 * In runtimes that don't support the `Intl.NumberFormat.resolvedOptions` API,
 * `null` is returned.
 *
 * @category Number
 */
export const resolveNumberFormat = resolveNumberFormatFactory(
  getNumberOptions,
) as (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => NumberFormat | null;

/**
 * Resolves the locale and collation options that are used to format a number
 * in the country's official currency.
 *
 * @example
 * import { resolveCurrencyFormat } from '@sumup-oss/intl';
 *
 * resolveCurrencyFormat();
 * // {
 * //   'locale': 'en-US',
 * //   'numberingSystem': 'latn',
 * //   'style': 'currency',
 * //   'currency': 'USD',
 * //   'currencyDisplay': 'symbol',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 2,
 * //   'maximumFractionDigits': 2,
 * //   'useGrouping': true,
 * //   'groupDelimiter': '.',
 * //   'decimalDelimiter': ',',
 * //   'currencySymbol': '$',
 * //   'currencyPosition': 'prefix',
 * // }
 *
 * resolveCurrencyFormat('ja-JP');
 * // {
 * //   'locale': 'ja-JP',
 * //   'numberingSystem': 'latn',
 * //   'style': 'currency',
 * //   'currency': 'JPY',
 * //   'currencyDisplay': 'symbol',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 0,
 * //   'maximumFractionDigits': 0,
 * //   'useGrouping': true,
 * //   'groupDelimiter': ',',
 * //   'decimalDelimiter': undefined,
 * //   'currencySymbol': '￥',
 * //   'currencyPosition': 'prefix',
 * // }
 *
 * resolveCurrencyFormat('en-GB', { currencyDisplay: 'name' });
 * // {
 * //   'locale': 'en-GB',
 * //   'numberingSystem': 'latn',
 * //   'style': 'currency',
 * //   'currency': 'GBP',
 * //   'currencyDisplay': 'symbol',
 * //   'minimumIntegerDigits': 1,
 * //   'minimumFractionDigits': 2,
 * //   'maximumFractionDigits': 2,
 * //   'useGrouping': true,
 * //   'groupDelimiter': ',',
 * //   'decimalDelimiter': '.',
 * //   'currencySymbol': 'British pounds',
 * //   'currencyPosition': 'suffix',
 * // }
 *
 * @remarks
 * For convenience, `groupDelimiter`,`decimalDelimiter`, `currencySymbol`, and
 * `currencyPosition` are returned in addition to the
 * `Intl.ResolvedNumberFormatOptions`.
 *
 * In runtimes that don't support the `Intl.NumberFormat.resolvedOptions` API,
 * `null` is returned.
 *
 * The COP and HUF currencies are formatted without decimals.
 *
 * @category Currency
 */
export const resolveCurrencyFormat = resolveNumberFormatFactory(
  getCurrencyOptions,
) as (
  locales?: Locale | Locale[],
  currency?: Currency,
  options?: Intl.NumberFormatOptions,
) => NumberFormat | null;

const TEST_VALUE = 1001001001.11111;

function resolveNumberFormatFactory<T extends GetOptions>(
  getOptions: T,
): (...args: Parameters<T>) => NumberFormat | null {
  if (!isNumberFormatToPartsSupported) {
    return (_locales, ..._args) => null;
  }

  return (locales, ...args): NumberFormat => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    const resolvedOptions = numberFormat.resolvedOptions();
    const parts = numberFormat.formatToParts(TEST_VALUE);

    const groupDelimiter = getPart(parts, 'group');
    const decimalDelimiter = getPart(parts, 'decimal');

    if (options.style === 'currency') {
      const currencySymbol = getPart(parts, 'currency');
      const currencyIndex = findIndex(
        parts,
        (part) => part.type === 'currency',
      );
      const currencyPosition = currencyIndex === 0 ? 'prefix' : 'suffix';
      return {
        ...resolvedOptions,
        groupDelimiter,
        decimalDelimiter,
        currencySymbol,
        currencyPosition,
      };
    }

    return { ...resolvedOptions, groupDelimiter, decimalDelimiter };
  };
}

function getPart(
  parts: Intl.NumberFormatPart[],
  name: Intl.NumberFormatPart['type'],
): string | undefined {
  return parts.find((part) => part.type === name)?.value;
}
