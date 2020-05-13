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
import { formatFactory, formatToPartsFactory, getFormatFactory } from './base';
import { isIntlSupported } from './lib/intl';
import { getDecimalOptions } from './lib/numbers';
import { getCurrencyOptions, CURRENCIES } from './lib/currencies';

type NumberArgs = [Intl.NumberFormatOptions?];
type CurrencyArgs = [Currency?, Intl.NumberFormatOptions?];

export const format = formatFactory<NumberArgs>(getDecimalOptions);
export const formatCurrency = formatFactory<CurrencyArgs>(getCurrencyOptions);

export const formatToParts = formatToPartsFactory<NumberArgs>(
  getDecimalOptions,
);
export const formatCurrencyToParts = formatToPartsFactory<CurrencyArgs>(
  getCurrencyOptions,
);

export const getFormat = getFormatFactory<NumberArgs>(getDecimalOptions);
export const getCurrencyFormat = getFormatFactory<CurrencyArgs>(
  getCurrencyOptions,
);

export { isIntlSupported, CURRENCIES };
