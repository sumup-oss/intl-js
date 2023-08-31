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

/* eslint-disable no-continue */

import type { Locale, Currency, NumericOptions } from '../../types';
import { CURRENCIES, CURRENCIES_WITHOUT_DECIMALS } from '../../data/currencies';

import { resolveLocale } from './intl';

export function extractCountry(locale: string): string {
  if (locale.length === 2) {
    return locale.toUpperCase();
  }
  const country = locale.split('-')[1];
  return country && country.toUpperCase();
}

export function resolveCurrency(locales?: Locale | Locale[]): Currency | null {
  const inferredLocale = resolveLocale(locales);
  const localesArray =
    typeof inferredLocale === 'string' ? [inferredLocale] : inferredLocale;
  // eslint-disable-next-line no-restricted-syntax
  for (const locale of localesArray) {
    const country = extractCountry(locale);
    if (!country) {
      continue;
    }

    const currency = CURRENCIES[country];
    if (!currency) {
      continue;
    }

    return currency;
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.NODE_ENV !== 'test'
  ) {
    throw new TypeError(
      [
        `No currency found for "${localesArray.join(', ')}".`,
        'Explicitly pass a currency as part of the options',
        'or submit a new one on GitHub.',
      ].join(' '),
    );
  }

  return null;
}

export function getCurrencyOptions(
  locales?: Locale | Locale[],
  currency?: Currency,
  options?: Intl.NumberFormatOptions,
): NumericOptions {
  const finalCurrency = currency || resolveCurrency(locales);

  if (!finalCurrency) {
    return {
      ...options,
      style: 'decimal',
    };
  }

  if (CURRENCIES_WITHOUT_DECIMALS.includes(finalCurrency)) {
    return {
      ...options,
      style: 'currency',
      currency: finalCurrency,
      minimumFractionDigits: 0,
    };
  }

  return {
    ...options,
    style: 'currency',
    currency: finalCurrency,
  };
}
