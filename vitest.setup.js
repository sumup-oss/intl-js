import { vi, expect } from 'vitest';
import * as matchers from 'jest-extended';

expect.extend(matchers);

vi.spyOn(Intl, 'NumberFormat');
vi.spyOn(Intl, 'DateTimeFormat');

// Apparently, Node.js doesn't implement these APIs.
// The mocked return value is based on the test value `1001001001.11111`
Intl.NumberFormat.prototype.formatToParts = vi.fn(() => [
  { type: 'currency', value: '$' },
  { type: 'integer', value: '1' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '001' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '111' },
]);
Intl.DateTimeFormat.prototype.formatToParts = vi.fn(() => []);
