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

import { Locales, Options, Value, FormatFn } from '../types';
import { memoize } from './memoize';

const supportsIntl = typeof Intl !== 'undefined';

export const getFormatFn = memoize(
  (locales: Locales, options?: Options): FormatFn => {
    if (!supportsIntl) {
      return (value: Value): string => `${value}`;
    }
    // eslint-disable-next-line @typescript-eslint/unbound-method
    return new Intl.NumberFormat(locales, options).format;
  },
);