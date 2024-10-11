/**
 * Copyright 2022, SumUp Ltd.
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

import { Temporal } from 'temporal-polyfill';

export const locales: (string | string[])[] = [
  'de-DE',
  'es-US',
  ['DE', 'US'],
  ['de-DE', 'es-US'],
];

export const dates = [
  new Date(Date.UTC(0, 0, 0, 0, 0, 0)),
  new Temporal.Instant(BigInt(0)),
  new Temporal.PlainDate(2024, 1, 1, 'gregory'),
  new Temporal.PlainDateTime(2024, 1, 1, 0, 0, 0, 0, 0, 0, 'gregory'),
  new Temporal.PlainYearMonth(2024, 1, 'gregory'),
  new Temporal.PlainMonthDay(1, 1, 'gregory'),
];

export const times = [
  new Date(Date.UTC(0, 0, 0, 0, 0, 0)),
  new Temporal.Instant(BigInt(0)),
  new Temporal.PlainTime(0, 0, 0),
  new Temporal.PlainDateTime(2024, 1, 1, 0, 0, 0, 0, 0, 0, 'gregory'),
];

export const datetimes = [
  new Date(Date.UTC(0, 0, 0, 0, 0, 0)),
  new Temporal.Instant(BigInt(0)),
  new Temporal.PlainDate(2024, 1, 1, 'gregory'),
  new Temporal.PlainTime(0, 0, 0),
  new Temporal.PlainDateTime(2024, 1, 1, 0, 0, 0, 0, 0, 0, 'gregory'),
  new Temporal.PlainYearMonth(2024, 1, 'gregory'),
  new Temporal.PlainMonthDay(1, 1, 'gregory'),
];
