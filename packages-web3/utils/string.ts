export function abbreviateString(str: string) {
  // 如果字符串长度小于等于8，就没有必要缩写
  if (str.length <= 8) {
    return str;
  }

  // 截取前4位和后4位
  const start = str.substring(0, 4);
  const end = str.substring(str.length - 4);

  // 返回缩写后的字符串
  return `${start}...${end}`;
}
