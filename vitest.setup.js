/**
 * Copyright 2025, SumUp Ltd.
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

import * as matchers from 'jest-extended';
import { Intl as IntlWithTemporal } from 'temporal-polyfill';
import { expect, vi } from 'vitest';

expect.extend(matchers);

vi.spyOn(Intl, 'RelativeTimeFormat');
vi.spyOn(Intl, 'NumberFormat');
vi.spyOn(IntlWithTemporal, 'DateTimeFormat');

// Apparently, Node.js doesn't implement these APIs.
// The mocked return value is based on the test value `1001001001.11111`
Intl.NumberFormat.prototype.formatToParts = vi.fn(() => [
  { type: 'currency', value: '$' },
  { type: 'integer', value: '1' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '111' },
]);
Intl.DateTimeFormat.prototype.formatToParts = vi.fn(() => []);
