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

import { Locale, Currency } from '../types';
import { resolveLocale, getNumberFormat } from './intl';
import { resolveCurrency } from './currencies';

type PartName =
  | 'currency'
  | 'decimal'
  | 'fraction'
  | 'group'
  | 'infinity'
  | 'integer'
  | 'literal'
  | 'minusSign'
  | 'nan'
  | 'plusSign'
  | 'percentSign';

export function getPart(
  testNumber: number,
  partName: PartName,
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
): string {
  const locale = resolveLocale(locales);
  const numberFormat = getNumberFormat(locale, options);
  const formattedNumber = numberFormat.formatToParts(testNumber);
  const part = formattedNumber.find(({ type }) => type === partName);
  return part?.value as string;
}

export function getDecimalSeparator(locales?: Locale | Locale[]): string {
  return getPart(1.1, 'decimal', locales);
}

export function getGroupSeparator(locales?: Locale | Locale[]): string {
  return getPart(1001001.1, 'group', locales);
}

export function getCurrencySymbol(
  locales?: Locale | Locale[],
  currency?: Currency,
): string {
  const options = {
    style: 'currency',
    currency: currency || (resolveCurrency(locales) as string),
  };
  return getPart(1.1, 'currency', locales, options);
}
