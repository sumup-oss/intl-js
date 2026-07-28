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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { formatRelativeTime, resolveRelativeTimeFormat } from '../index.js';

describe('Deprecation warnings', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('warns when locale is omitted', () => {
    formatRelativeTime(1, 'day');

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('locales'));
  });

  it('does not warn when locale is provided', () => {
    formatRelativeTime(1, 'day', 'de-DE');

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns when resolveRelativeTimeFormat is called without locale', () => {
    resolveRelativeTimeFormat();

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('locales'));
  });
});
