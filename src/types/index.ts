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

export type Locale = string;

export type Currency = string;

export type Format = Intl.ResolvedNumberFormatOptions & {
  groupDelimiter: string;
  decimalDelimiter: string;
  currencySymbol?: string;
  currencyPosition?: 'prefix' | 'suffix';
};

export interface DecimalOptions extends Intl.NumberFormatOptions {
  style: 'decimal';
}

export interface CurrencyOptions extends Intl.NumberFormatOptions {
  style: 'currency';
  currency: Currency;
}

export type Options = DecimalOptions | CurrencyOptions;