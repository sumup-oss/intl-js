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

import { Locale, NumberFormatOptions } from '../types';

export function getNumberOptions(
  locales?: Locale | Locale[],
  options?: Intl.NumberFormatOptions,
): NumberFormatOptions {
  return { style: 'decimal', ...options };
}

export function normalize(value?: string): number {
  if (!value || !value.length) {
    return 0;
  }

  const matches = /[^\d](\d{1,2})$/.exec(value) || [];
  const [, decimals] = matches;

  const digits = value.replace(/[^\d]/g, '');

  if (digits === '') {
    return 0.0;
  }

  const integers =
    decimals === undefined ? digits : digits.slice(0, -decimals.length);
  const numberString = `${integers}.${decimals}`;
  return parseFloat(numberString);
}
