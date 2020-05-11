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

export type Locale =
  | 'at'
  | 'be'
  | 'bg'
  | 'br'
  | 'ch'
  | 'cl'
  | 'cy'
  | 'cz'
  | 'de'
  | 'dk'
  | 'ee'
  | 'es'
  | 'fi'
  | 'fr'
  | 'gb'
  | 'gr'
  | 'hr'
  | 'hu'
  | 'ie'
  | 'it'
  | 'lt'
  | 'lu'
  | 'lv'
  | 'mt'
  | 'nl'
  | 'no'
  | 'pl'
  | 'pt'
  | 'ro'
  | 'ru'
  | 'se'
  | 'si'
  | 'sk'
  | 'us'
  | string;

export type Currency =
  | 'BGN'
  | 'BRL'
  | 'CHF'
  | 'CLP'
  | 'CZK'
  | 'DKK'
  | 'EUR'
  | 'GBP'
  | 'HRK'
  | 'HUF'
  | 'NOK'
  | 'PLN'
  | 'RON'
  | 'RUB'
  | 'SEK'
  | 'USD';

export interface DecimalOptions extends Intl.NumberFormatOptions {
  style: 'decimal';
}

export interface CurrencyOptions extends Intl.NumberFormatOptions {
  style: 'currency';
  currency: Currency;
}

export type Options = DecimalOptions | CurrencyOptions;
