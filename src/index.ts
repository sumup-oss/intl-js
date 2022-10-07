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

/* eslint-disable @typescript-eslint/unbound-method */

import type { Currency } from './types';
import {
  formatNumberFactory,
  formatNumberToPartsFactory,
  resolveNumberFormatFactory,
  getNumberOptions,
  getCurrencyOptions,
} from './lib/number-format';

export {
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
  isIntlSupported,
} from './lib/number-format';
export { CURRENCIES } from './data/currencies';

type NumberArgs = [Intl.NumberFormatOptions?];
type CurrencyArgs = [Currency?, Intl.NumberFormatOptions?];

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatNumber = formatNumberFactory<NumberArgs>(getNumberOptions);

/**
 * @deprecated Use {@link formatNumber} instead.
 */
export const format = formatNumber;

/**
 * Formats a number according to the locale in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatCurrency =
  formatNumberFactory<CurrencyArgs>(getCurrencyOptions);

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatNumberToParts =
  formatNumberToPartsFactory<NumberArgs>(getNumberOptions);

/**
 * @deprecated Use {@link formatNumberToParts} instead.
 */
export const formatToParts = formatNumberToParts;

/**
 * Formats a number according to the locale in the country's official currency
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatCurrencyToParts =
  formatNumberToPartsFactory<CurrencyArgs>(getCurrencyOptions);

/**
 * Resolves the locale and collation options that are used to format a number.
 */
export const resolveNumberFormat =
  resolveNumberFormatFactory<NumberArgs>(getNumberOptions);

/**
 * @deprecated Use {@link resolveNumberFormat} instead.
 */
export const resolveFormat = resolveNumberFormat;

/**
 * Resolves the locale and collation options that are used to format a number
 * in the country's official currency.
 */
export const resolveCurrencyFormat =
  resolveNumberFormatFactory<CurrencyArgs>(getCurrencyOptions);
