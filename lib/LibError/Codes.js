// internal errors
const Codes = {
  MISSING_VALUES: {
    code: 'MISSING_VALUES',
    message: 'missing values to draw the sparkline',
    name: 'InputError',
  },
  INVALID_VALUES: {
    code: 'INVALID_VALUES',
    message: 'values must be an array',
    name: 'InputError',
  },
};

module.exports = Codes;
