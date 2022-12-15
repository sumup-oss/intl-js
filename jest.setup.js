jest.spyOn(Intl, 'NumberFormat');
jest.spyOn(Intl, 'DateTimeFormat');

// Apparently, Node.js doesn't implement these APIs.
Intl.NumberFormat.prototype.formatToParts = jest.fn();
Intl.DateTimeFormat.prototype.formatToParts = jest.fn();
