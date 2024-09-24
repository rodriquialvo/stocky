/**
 * Formats a number with thousands separators and ensures it has two decimal places.
 *
 * This function takes a number, formats its integer part with commas as thousands
 * separators, and ensures the number has exactly two decimal places.
 *
 * @param num - The number to format.
 * @returns A string representing the formatted number.
 */
const formatNumberWithThousandsSeparatorAndDecimals = (num: number): string => {
  // Convert the number to a string with exactly two decimal places
  const numParts = num.toFixed(2).split('.');

  // Format the integer part with thousands separators
  numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numParts.join('.');
};

export default formatNumberWithThousandsSeparatorAndDecimals;
