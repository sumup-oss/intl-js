/**
 * Copyright 2026, SumUp Ltd.
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

import type { Locale } from '../types/index.js';

import { deprecationWarning } from './deprecation-warning.js';

const LOCALE_DEPRECATION_MESSAGE =
  '[@sumup-oss/intl] The `locales` argument will become required in a future version. ' +
  'Pass an explicit locale. When omitted, formatting uses the runtime default ' +
  '(browser or server locale), which may not match your user.';

let suppressLocaleWarningDepth = 0;

export function suppressLocaleDeprecationWarnings<T>(fn: () => T): T {
  suppressLocaleWarningDepth += 1;
  try {
    return fn();
  } finally {
    suppressLocaleWarningDepth -= 1;
  }
}

export function warnIfLocaleOmitted(locales?: Locale | Locale[]): void {
  if (suppressLocaleWarningDepth > 0) {
    return;
  }

  const isOmitted =
    locales === undefined ||
    locales === null ||
    locales === '' ||
    (Array.isArray(locales) && locales.length === 0);

  if (!isOmitted) {
    return;
  }

  deprecationWarning(LOCALE_DEPRECATION_MESSAGE);
}
