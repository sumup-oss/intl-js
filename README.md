<div align="center">

# Intl.js

[![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/intl-js)](https://codecov.io/gh/sumup-oss/intl-js) [![License](https://img.shields.io/github/license/sumup-oss/intl-js)](https://github.com/sumup-oss/intl-js/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

Format 🔢 numbers and 💱currency values for any locale with the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

</div>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API reference](https://github.com/sumup-oss/intl-js/wiki/Exports)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Installation

[`@sumup/intl`](https://www.npmjs.com/package/@sumup/intl) needs to be installed as a dependency via the [Yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com) package managers. The npm CLI ships with [Node](https://nodejs.org/en/). You can read how to install the Yarn CLI in [their documentation](https://yarnpkg.com/en/docs/install). `@sumup/intl` requires Node v10+.

Depending on your preference, run one of the following:

```sh
# With Yarn
$ yarn add @sumup/intl

# With npm
$ npm install @sumup/intl
```

`@sumup/intl` wraps the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) which is [supported by all modern browsers](https://caniuse.com/#search=NumberFormat) (note that [_formatToParts_](https://caniuse.com/#feat=mdn-javascript_builtins_intl_numberformat_formattoparts) is not supported by IE11). If you need to support older browsers, you need to include [a polyfill for the `Intl.NumberFormat` API](https://formatjs.io/docs/polyfills/intl-numberformat).

[Node](https://nodejs.org/en/) supports the `Intl` API since v8, however, it includes only the English localizations up to v12. Node v13 and above support all locales. If you're unable to use Node v13+, you can either include [a polyfill for the `Intl.NumberFormat` API](https://formatjs.io/docs/polyfills/intl-numberformat) or use a [custom Node build](https://nodejs.org/docs/latest-v8.x/api/intl.html#intl_options_for_building_node_js).

## Usage

All functions exported by `@sumup/intl` share a similar interface such as the common [`locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument), [`options`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#options_argument), and [`currency`](https://en.wikipedia.org/wiki/ISO_4217) arguments. These are passed on almost unchanged to the [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) constructor and thus support the same values. If the `locales` argument is not provided or is undefined, the runtime's default locale is used. Please refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for more details.

## API reference

### Number Functions

- [formatNumber](https://github.com/sumup-oss/intl-js/wiki/Exports#formatnumber)
- [formatNumberToParts](https://github.com/sumup-oss/intl-js/wiki/Exports#formatnumbertoparts)
- [resolveNumberFormat](https://github.com/sumup-oss/intl-js/wiki/Exports#resolvenumberformat)

### Currency Functions

- [formatCurrency](https://github.com/sumup-oss/intl-js/wiki/Exports#formatcurrency)
- [formatCurrencyToParts](https://github.com/sumup-oss/intl-js/wiki/Exports#formatcurrencytoparts)
- [resolveCurrencyFormat](https://github.com/sumup-oss/intl-js/wiki/Exports#resolvecurrencyformat)

### Variables

- [CURRENCIES](https://github.com/sumup-oss/intl-js/wiki/Exports#currencies)
- [isNumberFormatSupported](https://github.com/sumup-oss/intl-js/wiki/Exports#isnumberformatsupported)
- [isNumberFormatToPartsSupported](https://github.com/sumup-oss/intl-js/wiki/Exports#isnumberformattopartssupported)

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)
- [Robin Métral](mailto:robin.metral@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile point-of-sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
