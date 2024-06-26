interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
  onClick?: any;
}
export function CloseIcon(props: Props) {
  const {className, width = 24, height = 24, color = '#F6F7F3'} = props;
  return (
    <svg
      className={className}
      onClick={props?.onClick}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 6L6 18"
        stroke={color}
        stroke-width="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
