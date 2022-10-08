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

type NoUndefined<T> = T extends undefined ? never : T;

/**
 * These options are an approximation of their respective `dateStyle` option
 * based on the "en-US" locale.
 */
export const DATE_STYLES: Record<
  NoUndefined<Intl.DateTimeFormatOptions['dateStyle']>,
  Intl.DateTimeFormatOptions
> = {
  short: {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
  },
  medium: {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  },
  long: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
  full: {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  },
};

/**
 * These options are an approximation of their respective `timeStyle` option
 * based on the "en-US" locale.
 */
export const TIME_STYLES: Record<
  NoUndefined<Intl.DateTimeFormatOptions['timeStyle']>,
  Intl.DateTimeFormatOptions
> = {
  short: {
    hour: '2-digit',
    minute: '2-digit',
  },
  medium: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  },
  long: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  },
  full: {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'long',
  },
};
