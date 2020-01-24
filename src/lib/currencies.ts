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

import { Locale } from '../types';

export const CURRENCY_MAP = {
  at: 'EUR',
  be: 'EUR',
  bg: 'BGN',
  br: 'BRL',
  ch: 'CHF',
  cl: 'CLP',
  cy: 'EUR',
  cz: 'CZK',
  de: 'EUR',
  dk: 'DKK',
  ee: 'EUR',
  es: 'EUR',
  fi: 'EUR',
  fr: 'EUR',
  gb: 'GBP',
  gr: 'EUR',
  hr: 'HRK',
  hu: 'HUF',
  ie: 'EUR',
  it: 'EUR',
  lt: 'EUR',
  lu: 'EUR',
  lv: 'EUR',
  mt: 'EUR',
  nl: 'EUR',
  no: 'NOK',
  pl: 'PLN',
  pt: 'EUR',
  ro: 'RON',
  ru: 'RUB',
  se: 'SEK',
  si: 'EUR',
  sk: 'EUR',
  us: 'USD',
};

export function getCurrency(locales: Locale[]): string | null {
  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    const currency = (CURRENCY_MAP as any)[locale];
    if (currency) {
      return currency;
    }
  }
  return null;
}
