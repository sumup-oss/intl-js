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

import { Locale, CurrencyOptions, DecimalOptions } from '../types';

import { getNumberFormat } from './intl';

export const CURRENCY_MAP: { [country: string]: string } = {
  AT: 'EUR',
  BE: 'EUR',
  BG: 'BGN',
  BR: 'BRL',
  CH: 'CHF',
  CL: 'CLP',
  CY: 'EUR',
  CZ: 'CZK',
  DE: 'EUR',
  DK: 'DKK',
  EE: 'EUR',
  ES: 'EUR',
  FI: 'EUR',
  FR: 'EUR',
  GB: 'GBP',
  GR: 'EUR',
  HR: 'HRK',
  HU: 'HUF',
  IE: 'EUR',
  IT: 'EUR',
  LT: 'EUR',
  LU: 'EUR',
  LV: 'EUR',
  MT: 'EUR',
  NL: 'EUR',
  NO: 'NOK',
  PL: 'PLN',
  PT: 'EUR',
  RO: 'RON',
  RU: 'RUB',
  SE: 'SEK',
  SI: 'EUR',
  SK: 'EUR',
  US: 'USD',
};

function resolveLocale(locales?: Locale | Locale[]): Locale | Locale[] {
  if (locales && locales.length >= 0) {
    return locales;
  }
  const numberFormat = getNumberFormat();
  return numberFormat.resolvedOptions().locale;
}

export function extractCountry(locale: string): string {
  if (locale.length === 2) {
    return locale.toUpperCase();
  }
  const country = locale.split('-')[1];
  return country && country.toUpperCase();
}

export function resolveCurrency(locales?: Locale | Locale[]): string | null {
  const inferredLocale = resolveLocale(locales);
  const localesArray =
    typeof inferredLocale === 'string' ? [inferredLocale] : inferredLocale;
  // eslint-disable-next-line no-restricted-syntax
  for (const locale of localesArray) {
    const country = extractCountry(locale);
    if (!country) {
      continue;
    }

    const currency = CURRENCY_MAP[country];
    if (!currency) {
      continue;
    }

    return currency;
  }

  if (process.env.NODE_ENV !== 'production') {
    throw new TypeError(
      [
        `No currency found for "${localesArray.join(', ')}".`,
        'Explicitely pass a currency as part of the options',
        'or submit a new one on GitHub.',
      ].join(' '),
    );
  }

  return null;
}

export function getCurrencyOptions(
  locales?: Locale | Locale[],
  currency?: string,
  options?: Intl.NumberFormatOptions,
): CurrencyOptions | DecimalOptions {
  const finalCurrency = currency || resolveCurrency(locales);

  if (!finalCurrency) {
    return { ...options, style: 'decimal' };
  }

  return { ...options, style: 'currency', currency: finalCurrency };
}
