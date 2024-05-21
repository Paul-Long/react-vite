interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function CloseIcon(props: Props) {
  const {width = 32, height = 32, color = 'white'} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8061_6021)">
        <rect
          x="6.99963"
          y="23.9996"
          width="24"
          height="2"
          transform="rotate(-45 6.99963 23.9996)"
          fill={color}
        />
        <rect
          x="7.99902"
          y="7.00098"
          width="24"
          height="2"
          transform="rotate(45 7.99902 7.00098)"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_8061_6021">
          <rect width="32" height="32" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
