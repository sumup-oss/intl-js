[![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/intl-js)](https://codecov.io/gh/sumup-oss/intl-js) [![License](https://img.shields.io/github/license/sumup-oss/intl-js)](https://github.com/sumup-oss/intl-js/blob/master/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

<div align="center">

# Intl.js

Format numbers and currency values for any locale with the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

</div>

**Table of contents**

- [Installation](#installation)
- [Usage](#usage)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Installation

`@sumup/intl` needs to be installed as a dependency via the [Yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com) package managers. The npm CLI ships with [Node](https://nodejs.org/en/). You can read how to install the Yarn CLI in [their documentation](https://yarnpkg.com/en/docs/install). `@sumup/intl` requires Node v10.18+.

Depending on your preference, run one of the following:

```sh
# With Yarn
$ yarn add --dev @sumup/intl

# With npm
$ npm install --save-dev @sumup/intl
```

`@sumup/intl` wraps the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) which is [supported by all modern browsers](https://caniuse.com/#search=NumberFormat). If you need to support older browsers, you need to include [a polyfill for the `Intl.NumberFormat` API](https://formatjs.io/docs/polyfills/intl-numberformat).

[Node](https://nodejs.org/docs/latest-v8.x/api/intl.html) supports the `Intl` API since v8, however, it only includes the English localisations until v12. Node v13 and above support all locales. If you're unable to use Node v13+, you can either include [a polyfill for the `Intl.NumberFormat` API](https://formatjs.io/docs/polyfills/intl-numberformat) or use a [custom Node build](https://nodejs.org/docs/latest-v8.x/api/intl.html#intl_options_for_building_node_js).

## Usage

`@sumup/intl` exports the following functions:

### `format`

```ts
function format(
  value: number,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions,
): string;
```

### `formatCurrency`

```ts
function formatCurrency(
  value: number,
  locales?: string | string[],
  currency?: string,
  options?: Intl.NumberFormatOptions,
): string;
```

### `formatToParts`

```ts
function formatToParts(
  value: number,
  locales?: string | string[],
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormatPart[];
```

### `formatCurrencyToParts`

```ts
function formatCurrencyToParts(
  value: number,
  locales?: string | string[],
  currency?: string,
  options?: Intl.NumberFormatOptions,
): Intl.NumberFormatPart[];
```

### `getFormat`

```ts
function getFormat(
  locales?: string | string[],
  options?: Intl.NumberFormatOptions,
): Intl.ResolvedNumberFormatOptions & {
  groupDelimiter: string;
  decimalDelimiter: string;
};
```

### `getCurrencyFormat`

```ts
function getCurrencyFormat(
  locales?: string | string[],
  currency?: string,
  options?: Intl.NumberFormatOptions,
): Intl.ResolvedNumberFormatOptions & {
  groupDelimiter: string;
  decimalDelimiter: string;
  currencySymbol?: string;
  currencyPosition?: 'prefix' | 'suffix';
};
```

### `isIntlSupported`

```ts
const isIntlSupported: boolean;
```

### `CURRENCIES`

```ts
type Currency = string;
const CURRENCIES: { [countryCode: string]: Currency };
```

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
