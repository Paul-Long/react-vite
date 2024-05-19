interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function DownIcon(props: Props) {
  const {width = 18, height = 18, color = 'black'} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.2497 11.6418L9.2497 3.75M12.5029 8.37653L9.2479 11.642L5.99642 8.37652"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.30237 14.25L13.1963 14.25"
        stroke={color}
        strokeWidth="1.125"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
