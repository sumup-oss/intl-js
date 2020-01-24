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

import {
  Value,
  Locales,
  DecimalOptions,
  CurrencyOptions,
  Options,
} from './types';
import { getLocales } from './lib/locales';
import { getCurrency } from './lib/currencies';
import { getFormatFn } from './lib/intl';

function baseFormat(value: Value, locales: Locales, options?: Options): string {
  const formatFn = getFormatFn(locales, options);
  return formatFn(value);
}

export function format(value: Value, options?: DecimalOptions): string {
  const locales = getLocales(options?.locale);
  return baseFormat(value, locales, {
    ...options,
    style: 'decimal',
  });
}

export function formatCurrency(
  value: Value,
  options?: CurrencyOptions,
): string {
  const locales = getLocales(options?.locale);
  const currency = options?.currency || getCurrency(locales);

  if (!currency) {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        [
          `No currency found for "${locales.join(', ')}".`,
          'Explicitely pass a currency as part of the options',
          'or submit a new one on GitHub.',
        ].join(' '),
      );
    }

    return baseFormat(value, locales, {
      ...options,
      style: 'decimal',
    });
  }

  return baseFormat(value, locales, {
    ...options,
    style: 'currency',
    currency,
  });
}
