// utils/Helper.jsx

/**
 * Formats a number with thousand separators.
 * Optionally can add logic for large numbers (k, M, etc.)
 * @param {number} number The number to format.
 * @param {number} decimals The number of decimal places to include (default 0 for integer, adjust as needed).
 * @returns {string} The formatted number string.
 */
export const formatNumber = (number, decimals = 0) => {
  if (number === null || number === undefined) {
    return ''; // Or handle as needed, e.g., return 'N/A'
  }

  // Ensure the input is treated as a number
  const num = Number(number);

  if (isNaN(num)) {
    return String(number); // Return original if not a valid number
  }

  // Basic formatting with thousand separators using toLocaleString
  // This is generally the most reliable way for internationalization
  return num.toLocaleString('en-US', { // Using 'en-US' for comma separators, you can change locale if needed
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  });

  // --- Optional: Add logic for large numbers (k, M, B) ---
  // Uncomment and adjust the following if you prefer shortening large numbers

  /*
  const absNum = Math.abs(num);

  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(decimals) + 'T';
  }
  if (absNum >= 1e9) {
    return (num / 1e9).toFixed(decimals) + 'B';
  }
  if (absNum >= 1e6) {
    return (num / 1e6).toFixed(decimals) + 'M';
  }
  if (absNum >= 1e3) {
    return (num / 1e3).toFixed(decimals) + 'k';
  }

  // If number is less than 1000, just format normally
  return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
  });
  */
};

