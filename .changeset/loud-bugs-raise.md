---
'@sumup-oss/intl': major
---

Renamed the package scope from `@sumup` to `@sumup-oss`. Replace `@sumup/intl` with `@sumup-oss/intl` in your `package.json` file, then update all imports:

```diff
-import { formatNumber } from '@sumup/intl';
+import { formatNumber } from '@sumup-oss/intl';
```
