export function abbreviateString(str: string, s: number = 4, e: number = 4) {
  // If the string length is less than or equal to 8, there is no need to abbreviate
  if (str.length <= 8) {
    return str;
  }

  // Cut the first 4 characters and the last 4 characters
  const start = str.substring(0, s);
  const end = str.substring(str.length - e);

  // Return the abbreviated string
  return `${start}...${end}`;
}
