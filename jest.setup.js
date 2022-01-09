jest.spyOn(Intl, 'NumberFormat');

// Apparently, Node.js doesn't implement this API.
Intl.NumberFormat.prototype.formatToParts = jest.fn();
