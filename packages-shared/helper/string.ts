export const strUtils = {
  abbreviateString(str: string) {
    // If the string length is less than or equal to 8, there's no need to abbreviate
    if (str.length <= 8) {
      return str;
    }

    // Take the first 4 and the last 4 characters
    const start = str.substring(0, 4);
    const end = str.substring(str.length - 4);

    // Return the abbreviated string
    return `${start}...${end}`;
  },
};
