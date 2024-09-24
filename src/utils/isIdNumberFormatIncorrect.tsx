export const isIdNumberFormatIncorrect = (value: string, idNumber: string) =>
  (idNumber === 'CI' && value.length !== 16 && value.length !== 0) ||
  (idNumber === 'CE' && (value.length < 11 || value.length > 12));
