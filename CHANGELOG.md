# @sumup-oss/intl

## 2.0.0

### Major Changes

- [#250](https://github.com/sumup-oss/intl-js/pull/250) [`bf12d97`](https://github.com/sumup-oss/intl-js/commit/bf12d9748d4eb6f626123d2996c1c2cbd2c253d2) Thanks [@connor-baer](https://github.com/connor-baer)! - Added support for Temporal objects to the date and time formatting functions. The [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) package is now a required peer dependency.

- [#251](https://github.com/sumup-oss/intl-js/pull/251) [`ae93e19`](https://github.com/sumup-oss/intl-js/commit/ae93e19cf675f287d85f99230c156c4989de8685) Thanks [@connor-baer](https://github.com/connor-baer)! - Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/intl` with `@sumup-oss/intl` in your `package.json` file, then update all imports:

  ```diff
  -import { formatNumber } from '@sumup/intl';
  +import { formatNumber } from '@sumup-oss/intl';
  ```

- [#252](https://github.com/sumup-oss/intl-js/pull/252) [`53a8574`](https://github.com/sumup-oss/intl-js/commit/53a857412703dd684bb2579b4d231802d85c3035) Thanks [@connor-baer](https://github.com/connor-baer)! - Removed the deprecated `format`, `formatToParts`, `resolveFormat`, and `isIntlSupported` exports. Use the explicitly named `formatNumber`, `formatNumberToParts`, `resolveNumberFormat`, and `isNumberFormatSupported` exports instead.

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
