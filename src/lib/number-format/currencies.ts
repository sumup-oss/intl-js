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

import type { Currency, Locale, NumericOptions } from '../../types/index.js';
import { CURRENCIES_WITHOUT_DECIMALS } from '../../data/currencies.js';

export function getCurrencyOptions(
  currency: Currency,
  _locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
): NumericOptions {
  if (!currency) {
    return {
      ...options,
      style: 'decimal',
    };
  }

  if (CURRENCIES_WITHOUT_DECIMALS.includes(currency)) {
    return {
      ...options,
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
    };
  }

  return {
    ...options,
    style: 'currency',
    currency,
  };
}
