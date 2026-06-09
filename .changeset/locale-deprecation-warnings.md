---
'@sumup-oss/intl': minor
---

Deprecate implicit locale resolution across all formatters. When `locales` is omitted, a dev-time warning is now emitted advising consumers to pass an explicit locale. The `currency` omission warning (introduced in v3.2.0) continues to fire as before.

When currency cannot be resolved, a dev-time warning is now emitted before falling back to plain decimal formatting.

JSDoc for public formatters now documents that omitting `locales` or `currency` is deprecated, and examples have been updated to pass explicit values.

The existing `CURRENCIES` export remains deprecated and unchanged; consumers should source currency data from their own data layers.

Fixed `resolveLocale` treating `''` and `[]` as valid locales (a long-standing `length >= 0` bug). Empty values now fall through to the runtime default, consistent with omitted locale. This only affects currency inference when `currency` is omitted; normal call sites are unchanged.
