interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function SignalIcon(props: Props) {
  const {className, width = 24, height = 24, color = '#2C2D2D'} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 67 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10059_3393)">
        <path d="M9.49967 55.3572H0.356812V64.5H9.49967V55.3572Z" fill={color} />
        <path d="M23.7321 46.2142H14.5892V64.4999H23.7321V46.2142Z" fill={color} />
        <path d="M37.9613 30.9762H28.8185V64.5H37.9613V30.9762Z" fill={color} />
        <path d="M52.1938 15.738H43.0509V64.4999H52.1938V15.738Z" fill={color} />
        <path d="M66.4231 0.5H57.2803V64.5H66.4231V0.5Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_10059_3393">
          <rect width="66.0663" height="64" fill="white" transform="translate(0.356812 0.5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
