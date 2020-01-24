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

export type Value = number;

export type Locales = string[];

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

export interface BaseOptions {
  locale?: Locale | Locale[];
  localeMatcher?: 'best fit' | 'lookup';
  style?: 'decimal' | 'currency' | 'percent' | 'unit';
}

export type DecimalOptions = BaseOptions;

export interface CurrencyOptions extends BaseOptions {
  currency?: string;
  currencyDisplay?: 'symbol' | 'code' | 'name';
}

export type Options = DecimalOptions | CurrencyOptions;

export type FormatFn = (value: Value) => string;
