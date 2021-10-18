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

import { Currency } from './types';
import {
  formatFactory,
  formatToPartsFactory,
  resolveFormatFactory,
} from './base';
import { getNumberOptions } from './lib/numbers';
import { getCurrencyOptions } from './lib/currencies';

export {
  isNumberFormatSupported,
  isNumberFormatToPartsSupported,
  isIntlSupported,
} from './lib/intl';
export { CURRENCIES } from './data/currencies';

type NumberArgs = [Intl.NumberFormatOptions?];
type CurrencyArgs = [Currency?, Intl.NumberFormatOptions?];

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const format = formatFactory<NumberArgs>(getNumberOptions);

/**
 * Formats a number according to the locale in the country's official curreny
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatCurrency = formatFactory<CurrencyArgs>(getCurrencyOptions);

/**
 * Formats a number according to the locale with support for various
 * [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit),
 * and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatToParts = formatToPartsFactory<NumberArgs>(getNumberOptions);

/**
 * Formats a number according to the locale in the country's official curreny
 * with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).
 */
export const formatCurrencyToParts =
  formatToPartsFactory<CurrencyArgs>(getCurrencyOptions);

/**
 * Resolves the locale and collation options that are used to format a number.
 */
export const resolveFormat = resolveFormatFactory<NumberArgs>(getNumberOptions);

/**
 * Resolves the locale and collation options that are used to format a number
 * in the country's official currency.
 */
export const resolveCurrencyFormat =
  resolveFormatFactory<CurrencyArgs>(getCurrencyOptions);
