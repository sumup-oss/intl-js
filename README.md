<div align="center">

# Intl.js

[![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/intl-js)](https://codecov.io/gh/sumup-oss/intl-js) [![License](https://img.shields.io/github/license/sumup-oss/intl-js)](https://github.com/sumup-oss/intl-js/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

Format 🔢 numbers, 💱 currency values, 📅 dates, and 🕘 times for any locale with the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

</div>

## Table of contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [API reference](https://github.com/sumup-oss/intl-js/wiki)
- [Code of Conduct](#code-of-conduct)
- [About SumUp](#about-sumup)

## Introduction

`@sumup-oss/intl` is a light abstraction layer on top of the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl). In addition to a simplified API, it offers the following benefits:

### Performance

Creating instances of `Intl.*` formatters is an [expensive operation](https://blog.david-reess.de/posts/hBEx9w-on-number-formatting-and-performance). `@sumup-oss/intl` solves this by [memoizing](https://github.com/formatjs/intl-format-cache) the `Intl` formatters with a cache key based on the arguments passed to the constructor.

### Compatibility

`@sumup-oss/intl` works in [modern browsers](https://caniuse.com/mdn-javascript_builtins_intl_numberformat_numberformat,mdn-javascript_builtins_intl_datetimeformat_datetimeformat) as well as server runtimes with support for the `Intl` APIs (such as Node 13+). When the `Intl` APIs aren't (fully) available, `@sumup-oss/intl` tries to gracefully degrade. Please refer to the [API reference](#api-reference) to learn how certain functions behave when the runtime doesn't support the necessary APIs. If you need to support legacy browsers, consider including [polyfills](https://formatjs.io/docs/polyfills/).

`@sumup-oss/intl` integrates [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) to support formatting [`Temporal`](https://github.com/tc39/proposal-temporal) date-time objects.

## Installation

[`@sumup-oss/intl`](https://www.npmjs.com/package/@sumup-oss/intl) can be installed as a dependency via the [npm](https://www.npmjs.com) package manager. The [`temporal-polyfill`](https://www.npmjs.com/package/temporal-polyfill) package is a required peer dependency.

```sh
npm install @sumup-oss/intl temporal-polyfill
```

`@sumup-oss/intl` requires Node v18+.

## Usage

The functions exported by `@sumup-oss/intl` share a similar interface such as the common [`locales`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument), [`options`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#options_argument), and [`currency`](https://en.wikipedia.org/wiki/ISO_4217) arguments. These are passed on almost unchanged to the [`Intl.*`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#constructor_properties) constructors and thus support the same values. If the `locales` argument is not provided or is undefined, the runtime's default locale is used. Please refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) for more details.

Each type of data can be formatted with three increasingly advanced functions:

1. The `format*` functions return the formatted value as a string and cover the most common use cases.
2. The `format*ToParts` functions return an array of objects representing the value in parts that can be used for custom locale-aware formatting. For example, part of the formatted value could be rendered in bold.
3. The `resolve*Format` functions return an object with properties reflecting the locale and collation options computed during initialization of the object. These options can be passed to other functions or libraries to format values, for example [`react-number-format`](https://www.npmjs.com/package/react-number-format).

## API reference

### Number Functions

- [formatNumber](https://github.com/sumup-oss/intl-js/wiki/Function.formatnumber)
- [formatNumberToParts](https://github.com/sumup-oss/intl-js/wiki/Function.formatnumbertoparts)
- [resolveNumberFormat](https://github.com/sumup-oss/intl-js/wiki/Function.resolvenumberformat)

### Currency Functions

- [formatCurrency](https://github.com/sumup-oss/intl-js/wiki/Function.formatcurrency)
- [formatCurrencyToParts](https://github.com/sumup-oss/intl-js/wiki/Function.formatcurrencytoparts)
- [resolveCurrencyFormat](https://github.com/sumup-oss/intl-js/wiki/Function.resolvecurrencyformat)

### Date & Time Functions

- [formatDate](https://github.com/sumup-oss/intl-js/wiki/Function.formatdate)
- [formatTime](https://github.com/sumup-oss/intl-js/wiki/Function.formattime)
- [formatDateTime](https://github.com/sumup-oss/intl-js/wiki/Function.formatdatetime)
- [formatDateTimeToParts](https://github.com/sumup-oss/intl-js/wiki/Function.formatdatetimetoparts)
- [resolveDateTimeFormat](https://github.com/sumup-oss/intl-js/wiki/Function.resolvedatetimeformat)

### Variables

- [CURRENCIES](https://github.com/sumup-oss/intl-js/wiki/Variable.currencies)
- [isNumberFormatSupported](https://github.com/sumup-oss/intl-js/wiki/Variable.isnumberformatsupported)
- [isNumberFormatToPartsSupported](https://github.com/sumup-oss/intl-js/wiki/Variable.isnumberformattopartssupported)
- [isDateTimeFormatSupported](https://github.com/sumup-oss/intl-js/wiki/Variable.isdatetimeformatsupported)
- [isDateTimeFormatToPartsSupported](https://github.com/sumup-oss/intl-js/wiki/Variable.isdatetimeformattopartssupported)

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile point-of-sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in TypeScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
