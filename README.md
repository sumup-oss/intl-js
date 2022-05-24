<div align="center">

# Intl.js

[![Coverage](https://img.shields.io/codecov/c/github/sumup-oss/intl-js)](https://codecov.io/gh/sumup-oss/intl-js) [![License](https://img.shields.io/github/license/sumup-oss/intl-js)](https://github.com/sumup-oss/intl-js/blob/main/LICENSE)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.1%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

Format 🔢 numbers and 💱currency values for any locale with the [ECMAScript Internationalization API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl).

</div>

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Format as string](#format-as-string)
  - [Format as parts](#format-as-parts)
  - [Resolve format](#resolve-format)
  - [Constants](#constants)
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

### Format as string

#### `format`

Formats a number according to the locale with support for various [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit), and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).

**Arguments**

| Name     | Type                     | Examples                                                |
| -------- | ------------------------ | ------------------------------------------------------- |
| value    | number                   | `12345.67`, `-0.89`                                     |
| locales? | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| options? | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

**Examples**

```ts
import { format } from '@sumup/intl';

format(12345.67, 'de-DE'); // '12.345,67'
format(-0.89, ['ban', 'id']); // '-0,89'
format(16, 'en-GB', { style: 'unit', unit: 'liter', unitDisplay: 'long' }); // 16 litres
```

#### `formatCurrency`

Formats a number according to the locale in the country's official currency with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).

**Arguments**

| Name      | Type                     | Examples                                                |
| --------- | ------------------------ | ------------------------------------------------------- |
| value     | number                   | `12345.67`, `-0.89`                                     |
| locales?  | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| currency? | string                   | `'EUR'`, `'BRL'`, `'USD'`                               |
| options?  | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

**Examples**

```ts
import { formatCurrency } from '@sumup/intl';

formatCurrency(12345.67, 'de-DE'); // '12.345,67 €'
formatCurrency(89, 'ja-JP', 'JPY'); // '￥89'
formatCurrency(16, 'en-GB', null, { currencyDisplay: 'name' }); // '16.00 British pounds'
```

### Format as parts

#### `formatToParts`

Formats a number according to the locale with support for various [styles, units](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_style_and_unit), and [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).

**Arguments**

| Name     | Type                     | Examples                                                |
| -------- | ------------------------ | ------------------------------------------------------- |
| value    | number                   | `12345.67`, `-0.89`                                     |
| locales? | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| options? | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

```ts
import { formatToParts } from '@sumup/intl';

formatToParts(12345.67, 'de-DE');
// [
//   { type: "integer", value: "12" },
//   { type: "group", value: "." },
//   { type: "integer", value: "345" },
//   { type: "decimal", value: "," },
//   { type: "fraction", value: "67" },
// ]

formatToParts(-0.89, ['ban', 'id']);
// [
//   { type: "minusSign", value: "-" },
//   { type: "integer", value: "0" },
//   { type: "decimal", value: "," },
//   { type: "fraction", value: "89" },
// ]

formatToParts(16, 'en-GB', {
  style: 'unit',
  unit: 'liter',
  unitDisplay: 'long',
});
// [
//   { type: "integer", value: "16" },
//   { type: "literal", value: " " },
//   { type: "unit", value: "litres" },
// ]
```

#### `formatCurrencyToParts`

Formats a number according to the locale in the country's official currency with support for various [notations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#Using_notation).

**Arguments**

| Name      | Type                     | Examples                                                |
| --------- | ------------------------ | ------------------------------------------------------- |
| value     | number                   | `12345.67`, `-0.89`                                     |
| locales?  | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| currency? | string                   | `'EUR'`, `'BRL'`, `'USD'`                               |
| options?  | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

**Examples**

```ts
import { formatCurrencyToParts } from '@sumup/intl';

formatCurrencyToParts(12345.67, 'de-DE');
// [
//   { type: "integer", value: "12" },
//   { type: "group", value: "." },
//   { type: "integer", value: "345" },
//   { type: "decimal", value: "," },
//   { type: "fraction", value: "67" },
//   { type: "literal", value: " " },
//   { type: "currency", value: "€" },
// ]

formatCurrencyToParts(-89, 'ja-JP', 'JPY');
// [
//   { type: "minusSign", value: "-" },
//   { type: "currency", value: "￥" },
//   { type: "integer", value: "89" },
// ]

formatCurrencyToParts(16, 'en-GB', null, { currencyDisplay: 'name' });
// [
//   { type: "integer", value: "16" },
//   { type: "decimal", value: "." },
//   { type: "fraction", value: "00" },
//   { type: "literal", value: " " },
//   { type: "currency", value: "British pounds" },
// ]
```

### Resolve format

#### `resolveFormat`

Resolves the locale and collation options that are used to format a number.

**Arguments**

| Name     | Type                     | Examples                                                |
| -------- | ------------------------ | ------------------------------------------------------- |
| locales? | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| options? | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

**Examples**

```ts
import { resolveFormat } from '@sumup/intl';

resolveFormat();
// {
//   'locale': 'en-US',
//   'numberingSystem': 'latn',
//   'style': 'decimal',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 0,
//   'maximumFractionDigits': 3,
//   'useGrouping': true,
//   'groupDelimiter': ',',
//   'decimalDelimiter': '.',
// }

resolveFormat(['ban', 'id']);
// {
//   'locale': 'id',
//   'numberingSystem': 'latn',
//   'style': 'decimal',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 0,
//   'maximumFractionDigits': 3,
//   'useGrouping': true,
//   'groupDelimiter': '.',
//   'decimalDelimiter': ',',
// }

resolveFormat('en-GB', { style: 'unit', unit: 'liter', unitDisplay: 'long' });
// {
//   'locale': 'en-GB',
//   'numberingSystem': 'latn',
//   'style': 'unit',
//   'unit': 'liter',
//   'unitDisplay': 'long',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 0,
//   'maximumFractionDigits': 3,
//   'useGrouping': true,
//   'notation': 'standard',
//   'signDisplay': 'auto',
//   'groupDelimiter': ',',
//   'decimalDelimiter': '.',
// }
```

#### `resolveCurrencyFormat`

Resolves the locale and collation options that are used to format a number in the country's official currency.

**Arguments**

| Name      | Type                     | Examples                                                |
| --------- | ------------------------ | ------------------------------------------------------- |
| locales?  | string \| string[]       | `'de-DE'`, `'DE'`, `'zh-Hans-CN'`, `['de-AT', 'de-DE']` |
| currency? | string                   | `'EUR'`, `'BRL'`, `'USD'`                               |
| options?  | Intl.NumberFormatOptions | `{ style: 'unit', unit: 'mile-per-hour' }`              |

**Examples**

```ts
import { resolveCurrencyFormat } from '@sumup/intl';

resolveCurrencyFormat();
// {
//   'locale': 'en-US',
//   'numberingSystem': 'latn',
//   'style': 'currency',
//   'currency': 'USD',
//   'currencyDisplay': 'symbol',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 2,
//   'maximumFractionDigits': 2,
//   'useGrouping': true,
//   'groupDelimiter': '.',
//   'decimalDelimiter': ',',
//   'currencySymbol': '$',
//   'currencyPosition': 'prefix',
// }

resolveCurrencyFormat('ja-JP');
// {
//   'locale': 'ja-JP',
//   'numberingSystem': 'latn',
//   'style': 'currency',
//   'currency': 'JPY',
//   'currencyDisplay': 'symbol',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 0,
//   'maximumFractionDigits': 0,
//   'useGrouping': true,
//   'groupDelimiter': ',',
//   'decimalDelimiter': undefined,
//   'currencySymbol': '￥',
//   'currencyPosition': 'prefix',
// }

resolveCurrencyFormat('en-GB', { currencyDisplay: 'name' });
// {
//   'locale': 'en-GB',
//   'numberingSystem': 'latn',
//   'style': 'currency',
//   'currency': 'GBP',
//   'currencyDisplay': 'symbol',
//   'minimumIntegerDigits': 1,
//   'minimumFractionDigits': 2,
//   'maximumFractionDigits': 2,
//   'useGrouping': true,
//   'groupDelimiter': ',',
//   'decimalDelimiter': '.',
//   'currencySymbol': 'British pounds',
//   'currencyPosition': 'suffix',
// }
```

### Constants

#### `isNumberFormatSupported`

Whether the `Intl` and `Intl.NumberFormat` APIs are supported by the runtime.

```ts
const isNumberFormatSupported: boolean;
```

#### `isNumberFormatToPartsSupported`

Whether the `Intl`, `Intl.NumberFormat`, and `Intl.NumberFormat.formatToParts` APIs are supported by the runtime.

```ts
const isNumberFormatToPartsSupported: boolean;
```

#### `CURRENCIES`

An object that maps a 2 char country code to its official 3 char currency code. [View all supported countries](https://github.com/sumup-oss/intl-js/blob/main/src/data/currencies.ts).

```ts
const CURRENCIES: { [country: string]: string };
```

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. Like all SumUp Open Source projects, this project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](CODE_OF_CONDUCT.md).

If you feel another member of the community violated our CoC or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers. We will enforce the CoC.

### Maintainers

- [Connor Bär](mailto:connor.baer@sumup.com)
- [Robin Métral](mailto:robin.metral@sumup.com)

## About SumUp

![SumUp logo](https://raw.githubusercontent.com/sumup-oss/assets/master/sumup-logo.svg?sanitize=true)

[SumUp](https://sumup.com) is a mobile-point of sale provider. It is our mission to make easy and fast card payments a reality across the _entire_ world. You can pay with SumUp in more than 30 countries, already. Our engineers work in Berlin, Cologne, Sofia, and Sāo Paulo. They write code in JavaScript, Swift, Ruby, Go, Java, Erlang, Elixir, and more.

Want to come work with us? [Head to our careers page](https://sumup.com/careers) to find out more.
