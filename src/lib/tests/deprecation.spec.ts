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

import { deprecationWarning } from '../deprecation-warning.js';
import {
  suppressLocaleDeprecationWarnings,
  warnIfLocaleOmitted,
} from '../locale-deprecation.js';

describe('deprecationWarning', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
    vi.unstubAllEnvs();
  });

  it('does not warn in production', () => {
    vi.stubEnv('NODE_ENV', 'production');

    deprecationWarning('test message');

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('warns outside production', () => {
    vi.stubEnv('NODE_ENV', 'development');

    deprecationWarning('test message');

    expect(warnSpy).toHaveBeenCalledWith('test message');
  });
});

describe('warnIfLocaleOmitted', () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('does not warn when locale warnings are suppressed', () => {
    suppressLocaleDeprecationWarnings(() => {
      warnIfLocaleOmitted(undefined);
    });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('returns the callback result from suppressLocaleDeprecationWarnings', () => {
    const result = suppressLocaleDeprecationWarnings(() => 'value');

    expect(result).toBe('value');
  });
});
