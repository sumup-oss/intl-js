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

import { Locale, Options, Format } from './types';
import {
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
  memoizeIntl,
} from './lib/intl';
import { findIndex } from './lib/findIndex';

type Args = Array<unknown>;

type GetOptions<T extends Args> = (
  locales?: Locale | Locale[],
  ...args: T
) => Options;

export function formatFactory<T extends Args>(
  getOptions: GetOptions<T>,
): (value: number, locales?: Locale | Locale[], ...args: T) => string {
  if (!isNumberFormatSupported) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (value, _locales, ..._args): string => `${value}`;
  }

  const getNumberFormat = memoizeIntl();

  return (value, locales, ...args): string => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.format(value);
  };
}

export function formatToPartsFactory<T extends Args>(
  getOptions: GetOptions<T>,
): (
  value: number,
  locales?: Locale | Locale[],
  ...args: T
) => Intl.NumberFormatPart[] {
  if (!isNumberFormatToPartsSupported) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (value, _locales, ..._args): Intl.NumberFormatPart[] => [
      { type: 'integer', value: value.toString() },
    ];
  }

  const getNumberFormat = memoizeIntl();

  return (value, locales, ...args): Intl.NumberFormatPart[] => {
    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.formatToParts(value);
  };
}

const TEST_VALUE = 1001001001.11111;

function getPart(parts: Intl.NumberFormatPart[], name: string): string {
  return parts.find((part) => part.type === name)?.value as string;
}

export function resolveFormatFactory<T extends Args>(
  getOptions: GetOptions<T>,
): (locales?: Locale | Locale[], ...args: T) => null | Format {
  if (!isNumberFormatToPartsSupported) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (_locales, ..._args) => null;
  }

  const getNumberFormat = memoizeIntl();

  return (locales, ...args): Format => {
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
