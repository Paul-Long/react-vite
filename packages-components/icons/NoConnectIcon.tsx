interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function NoConnectIcon(props: Props) {
  const {className, width = 24, height = 24, color = '#2C2D2D'} = props;
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_10071_11900)">
        <path
          d="M56.2845 -5.2466e-05L32.0007 24.2837L39.7167 31.9996L64.0004 7.7159L56.2845 -5.2466e-05Z"
          fill={color}
        />
        <path
          d="M24.2845 32.0004L0.000732422 56.2842L7.71668 64.0001L32.0004 39.7164L24.2845 32.0004Z"
          fill={color}
        />
        <path
          d="M39.7169 32.0004L32.001 39.7163L56.2847 64.0001L64.0007 56.2841L39.7169 32.0004Z"
          fill={color}
        />
        <path
          d="M7.71644 0.000359066L0.000488281 7.71631L24.2842 32.0001L32.0002 24.2841L7.71644 0.000359066Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_10071_11900">
          <rect width="64" height="64" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
