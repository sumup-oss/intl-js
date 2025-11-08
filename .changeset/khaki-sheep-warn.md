---
'@sumup-oss/intl': minor
---

Added support for formatting datetime ranges.

```ts
import { formatDateTimeRange } from '@sumup-oss/intl';

const start = new Temporal.PlainDate(2025, 11, 1);
const end = new Temporal.PlainDate(2025, 11, 30);

formatDateTimeRange(start, end, 'de-DE'); // '01.–30.11.2025'
```
