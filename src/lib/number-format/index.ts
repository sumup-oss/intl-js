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
} from '../../types';
import { findIndex } from '../find-index';

import {
  isIntlSupported,
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
  getNumberFormat,
} from './intl';
import { getNumberOptions } from './numbers';
import { getCurrencyOptions } from './currencies';

export {
  isIntlSupported,
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
};

type GetOptions = (
  locales: Locale | Locale[],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => NumericOptions;

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatNumber = formatNumberFactory(getNumberOptions) as (
  value: number,
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => string;

/**
 * @deprecated Use {@link formatNumber} instead.
 */
export const format = formatNumber;

/**
 * Formats a number according to the locale in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (value, _locales, ..._args): string => value.toLocaleString();
  }

  return (value, locales, ...args): string => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.format(value);
  };
}

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatNumberToParts = formatNumberToPartsFactory(
  getNumberOptions,
) as (
  value: number,
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => Intl.NumberFormatPart[];

/**
 * @deprecated Use {@link formatNumberToParts} instead.
 */
export const formatToParts = formatNumberToParts;

/**
 * Formats a number according to the locale in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
 */
export const resolveNumberFormat = resolveNumberFormatFactory(
  getNumberOptions,
) as (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => NumberFormat | null;

/**
 * @deprecated Use {@link resolveNumberFormat} instead.
 */
export const resolveFormat = resolveNumberFormat;

/**
 * Resolves the locale and collation options that are used to format a number
 * in the country's official currency.
 */
export const resolveCurrencyFormat = resolveNumberFormatFactory(
  getCurrencyOptions,
) as (
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
) => NumberFormat | null;

const TEST_VALUE = 1001001001.11111;

function resolveNumberFormatFactory<T extends GetOptions>(
  getOptions: T,
): (...args: Parameters<T>) => NumberFormat | null {
  if (!isNumberFormatToPartsSupported) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
