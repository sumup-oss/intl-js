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

import { configs, defineConfig } from '@sumup-oss/foundry/eslint';
import vitest from '@vitest/eslint-plugin';

export default defineConfig([
  configs.ignores,
  configs.javascript,
  {
    extends: [configs.typescript],
    languageOptions: {
      parserOptions: {
        // eslint-disable-next-line n/no-unsupported-features/node-builtins, @typescript-eslint/no-unsafe-assignment
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: ['*.js', '*.cjs'],
        },
      },
    },
  },
  configs.browser,
  configs.node,
  {
    extends: [vitest.configs.recommended, configs.tests],
  },
  configs.openSource,
]);
