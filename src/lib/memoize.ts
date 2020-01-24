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

// eslint-disable-next-line space-before-function-paren
export function memoize<R, T extends (...args: any[]) => R>(fn: T): T {
  const memory = new Map<string, R>();

  const memoizedFn = (...args: any[]) => {
    const key = JSON.stringify(args);
    const memoryValue = memory.get(key);

    if (typeof memoryValue !== 'undefined') {
      return memoryValue;
    }

    const value = fn(...args);
    memory.set(key, value);

    return value;
  };

  return memoizedFn as T;
}