/**
 * Copyright 2024, SumUp Ltd.
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

// biome-ignore lint/suspicious/noExplicitAny: A more specific type doesn't work here
type Constructor<T> = new (...args: any[]) => T;

export function memoize<
  Format,
  FormatConstructor extends Constructor<Format>,
  Args extends ConstructorParameters<FormatConstructor>,
>(IntlFormatConstructor: FormatConstructor) {
  const cache = new Map<string, Format>();

  return (...args: Args): Format => {
    const cacheKey = getCacheKey(args);
    if (!cacheKey) {
      return new IntlFormatConstructor(...args);
    }

    const cachedFormat = cache.get(cacheKey);

    if (cachedFormat) {
      return cachedFormat;
    }

    const format = new IntlFormatConstructor(...args);

    cache.set(cacheKey, format);

    return format;
  };
}

function getCacheKey(inputs: unknown[]) {
  return JSON.stringify(
    inputs.map((input) =>
      isObject(input) ? sortObjectProperties(input) : input,
    ),
  );
}

function isObject<T extends Record<string, unknown>>(
  value: unknown,
): value is T {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function sortObjectProperties(obj: Record<string, unknown>) {
  return Object.keys(obj)
    .sort()
    .map((key) => [key, obj[key]]);
}
