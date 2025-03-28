# @sumup-oss/intl

## 3.1.1

### Patch Changes

- [#306](https://github.com/sumup-oss/intl-js/pull/306) [`ac277ae`](https://github.com/sumup-oss/intl-js/commit/ac277aebd5c47e2221352e34c743f75f974f5f0a) Thanks [@connor-baer](https://github.com/connor-baer)! - Widened the allowed version range for the `temporal-polyfill` peer dependency which recently added support for the March 2025 version of the Temporal spec.

## 3.1.0

### Minor Changes

- [`4cd3fbe`](https://github.com/sumup-oss/intl-js/commit/4cd3fbe35a2df0a959ce56e596acae5b151774f9) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for formatting relative times.

  ```ts
  import { formatRelativeTime } from '@sumup-oss/intl';

  formatRelativeTime(7, 'years', 'pt-BR'); // 'em 7 anos'
  ```

## 3.0.1

### Patch Changes

- [#270](https://github.com/sumup-oss/intl-js/pull/270) [`44ad012`](https://github.com/sumup-oss/intl-js/commit/44ad012bd8c9cdd6d101501fe7f188d8d792efb1) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the `intl-format-cache` dependency.

## 3.0.0

### Major Changes

- [#268](https://github.com/sumup-oss/intl-js/pull/268) [`3d4219e`](https://github.com/sumup-oss/intl-js/commit/3d4219e5dd6377cf320383168949ee9e8cf15327) Thanks [@connor-baer](https://github.com/connor-baer)! - **This package is now pure ESM**. Please [read this](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

  - If you use TypeScript, you need to use TypeScript 4.7 or later ([ref](https://github.com/microsoft/TypeScript/issues/46452)).
  - If you use a bundler, make sure it supports ESM and that you have correctly configured it for ESM. (Next.js supports ESM packages out of the box since [v12](https://nextjs.org/blog/next-12#es-modules-support-and-url-imports)).

- [#268](https://github.com/sumup-oss/intl-js/pull/268) [`3d4219e`](https://github.com/sumup-oss/intl-js/commit/3d4219e5dd6377cf320383168949ee9e8cf15327) Thanks [@connor-baer](https://github.com/connor-baer)! - Raised the minimum Node.js version to 18+. This is the first maintained version with support for ES modules.

## 2.0.1

### Patch Changes

- [#266](https://github.com/sumup-oss/intl-js/pull/266) [`d817935`](https://github.com/sumup-oss/intl-js/commit/d81793501ebcd4d5fd61a11c1c0f5398da63146d) Thanks [@connor-baer](https://github.com/connor-baer)! - Improved the types to allow passing Temporal objects to the date and time formatting functions.

## 2.0.0

### Major Changes

- [#251](https://github.com/sumup-oss/intl-js/pull/251) [`ae93e19`](https://github.com/sumup-oss/intl-js/commit/ae93e19cf675f287d85f99230c156c4989de8685) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/intl` with `@sumup-oss/intl` in your `package.json` file, then update all imports:

  ```diff
  -import { formatNumber } from '@sumup/intl';
  +import { formatNumber } from '@sumup-oss/intl';
  ```

- [#252](https://github.com/sumup-oss/intl-js/pull/252) [`53a8574`](https://github.com/sumup-oss/intl-js/commit/53a857412703dd684bb2579b4d231802d85c3035) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `format`, `formatToParts`, `resolveFormat`, and `isIntlSupported` exports. Use the explicitly named `formatNumber`, `formatNumberToParts`, `resolveNumberFormat`, and `isNumberFormatSupported` exports instead.

- [#250](https://github.com/sumup-oss/intl-js/pull/250) [`bf12d97`](https://github.com/sumup-oss/intl-js/commit/bf12d9748d4eb6f626123d2996c1c2cbd2c253d2) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for [`Temporal`](https://github.com/tc39/proposal-temporal) objects to the date and time formatting functions. The [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) package is now a required peer dependency.

## 1.6.0

### Minor Changes

- [#198](https://github.com/sumup-oss/intl-js/pull/198) [`fe8e8dc`](https://github.com/sumup-oss/intl-js/commit/fe8e8dc5fdca41e5947f4c720863b588600a9936) Thanks [@connor-baer](https://github.com/connor-baer)! - Added exceptions for the COP and HUF currencies to be formatted without decimals. While these currencies support decimals under the ISO standard, the decimals are not used in everyday life.

## 1.5.0

### Minor Changes

- [#158](https://github.com/sumup-oss/intl-js/issues/158) [`a579522`](https://github.com/sumup-oss/intl-js/commit/a579522781dc5db358430f081d1614b5f6c1cdd5) Thanks [@andrewgarshyn](https://github.com/andrewgarshyn)! - Update Croatian currency to EUR

## 1.4.0

### Minor Changes

- [#125](https://github.com/sumup-oss/intl-js/issues/125) [`f3932b6`](https://github.com/sumup-oss/intl-js/commit/f3932b6858273870fccf2ee9fb2b7b7883a5098e) Thanks [@connor-baer](https://github.com/connor-baer)! - Add support for formatting dates and times

## 1.3.1

### Patch Changes

- [#139](https://github.com/sumup-oss/intl-js/issues/139) [`a35b171`](https://github.com/sumup-oss/intl-js/commit/a35b17192332b48f4ef81c5ff8005dc1f34b20f1) Thanks [@connor-baer](https://github.com/connor-baer)! - Correct types for `resolveCurrencyFormat`

## 1.3.0

### Minor Changes

- [`682ae11`](https://github.com/sumup-oss/intl-js/commit/682ae1195139050136195afb63d31ea140b61ef8) Thanks [@connor-baer](https://github.com/connor-baer)! - Use explicit names for number formatting functions

### Patch Changes

- [`de86dad`](https://github.com/sumup-oss/intl-js/commit/de86dada532023a1141974bab33ed150a67dd0cf) Thanks [@connor-baer](https://github.com/connor-baer)! - Improve types of function parameters
- [`dafc682`](https://github.com/sumup-oss/intl-js/commit/dafc682a8cadd2a7d885ed4068b4e83458037e9f) Thanks [@connor-baer](https://github.com/connor-baer)! - Mark `groupDelimiter` and `decimalDelimiter` as optional

## 1.2.0

### Minor Changes

- [`b00d0ab`](https://github.com/sumup-oss/intl-js/commit/b00d0ab3e15be15d40b8aee4274bb85c46a78f18) Thanks [@connor-baer](https://github.com/connor-baer)! - Add support for formatting with unit
