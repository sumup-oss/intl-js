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

import { formatCurrency } from '../index.js';

import { number } from './shared.js';

describe('Deprecation warnings', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('warns when currency is omitted', () => {
    formatCurrency(number, 'de-DE');

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('currency'));
  });

  it('warns when locale is omitted', () => {
    formatCurrency(number, undefined, 'EUR');

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('locales'));
  });

  it('does not warn when locale and currency are provided', () => {
    formatCurrency(number, 'de-DE', 'EUR');

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns when currency cannot be resolved and falls back to decimal formatting', () => {
    formatCurrency(number, 'xx-XX');

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('plain decimal'),
    );
  });

  it('warns about decimal fallback in development without throwing', () => {
    vi.stubEnv('NODE_ENV', 'development');

    expect(() => formatCurrency(number, 'xx-XX')).not.toThrow();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('plain decimal'),
    );

    vi.unstubAllEnvs();
  });

  it('warns when locale is an empty string', () => {
    try {
      formatCurrency(number, '', 'EUR');
    } catch {
      // Intl rejects an empty locale string after the deprecation warning.
    }

    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('locales'));
  });
});
