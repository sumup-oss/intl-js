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

import { Locale, Options, Format, Parts } from './types';
import { isIntlSupported, getNumberFormat } from './lib/intl';

type Args = Array<unknown>;

type GetOptions<T extends Args> = (
  locales?: Locale | Locale[],
  ...args: T
) => Options;

export function formatFactory<T extends Args>(getOptions: GetOptions<T>) {
  return (value: number, locales?: Locale | Locale[], ...args: T): string => {
    if (!isIntlSupported) {
      return `${value}`;
    }

    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.format(value);
  };
}

export function formatToPartsFactory<T extends Args>(
  getOptions: GetOptions<T>,
) {
  return (
    value: number,
    locales?: Locale | Locale[],
    ...args: T
  ): Intl.NumberFormatPart[] => {
    if (!isIntlSupported) {
      return [{ type: 'integer', value: value.toString() }];
    }

    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    return numberFormat.formatToParts(value);
  };
}

const TEST_VALUE = 1001001001.11111;

export function getFormatFactory<T extends Args>(getOptions: GetOptions<T>) {
  return (locales?: Locale | Locale[], ...args: T): Format | null => {
    if (!isIntlSupported) {
      return null;
    }

    const options = getOptions(locales, ...args);
    const numberFormat = getNumberFormat(locales, options);
    const resolvedOptions = numberFormat.resolvedOptions();
    const rawParts = numberFormat.formatToParts(TEST_VALUE);

    const parts = rawParts.reduce((allParts, part) => {
      if (part.type === 'integer' || part.type === 'fraction') {
        return allParts;
      }
      // eslint-disable-next-line no-param-reassign
      allParts[part.type] = part.value;
      return allParts;
    }, {} as Parts);

    if (options.style === 'currency') {
      const currencyIndex = rawParts.findIndex(
        (part) => part.type === 'currency',
      );
      const currencyPosition = currencyIndex === 0 ? 'prefix' : 'suffix';
      return { ...resolvedOptions, parts, currencyPosition };
    }

    return { ...resolvedOptions, parts };
  };
}
