interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function SOLIcon(props: Props) {
  const {className, width = 24, height = 24, color = '#2C2D2D'} = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10059_5410)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.73398 6.14873C6.83204 6.0548 6.96149 6 7.09485 6H19.545C19.7726 6 19.8863 6.27398 19.7255 6.43446L17.266 8.88855C17.1719 8.98248 17.0425 9.03728 16.9052 9.03728H4.45498C4.22747 9.03728 4.11371 8.7633 4.27454 8.60282L6.73398 6.14873ZM6.73398 15.3114C6.82812 15.2175 6.95757 15.1627 7.09485 15.1627H19.545C19.7726 15.1627 19.8863 15.4367 19.7255 15.5972L17.266 18.0512C17.1719 18.1452 17.0425 18.2 16.9052 18.2H4.45498C4.22747 18.2 4.11371 17.926 4.27454 17.7655L6.73398 15.3114ZM16.9052 10.5521C17.0425 10.5521 17.1719 10.6068 17.266 10.7008L19.7255 13.1549C19.8863 13.3153 19.7726 13.5893 19.545 13.5893H7.09485C6.95757 13.5893 6.82812 13.5345 6.73398 13.4406L4.27454 10.9865C4.11371 10.826 4.22747 10.5521 4.45498 10.5521H16.9052Z"
          fill="url(#paint0_linear_10059_5410)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10059_5410"
          x1="16.4599"
          y1="3.54643"
          x2="7.87282"
          y2="20.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00FFA3" />
          <stop offset="1" stopColor="#DC1FFF" />
        </linearGradient>
        <clipPath id="clip0_10059_5410">
          <rect width="15.6" height="12.2" fill="white" transform="translate(4.2002 6)" />
        </clipPath>
      </defs>
    </svg>
  );
}
