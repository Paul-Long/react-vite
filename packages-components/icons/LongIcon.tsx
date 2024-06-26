interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function LongIcon(props: Props) {
  const {className, width = 16, height = 16, color = '#F6F7F399'} = props;
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.893 3.25879V8.63479H13.6073V7.14279L9.15189 11.5988L5.9376 8.38508L1.91532 12.4074L0.299316 10.7908L5.9376 5.1525L9.15189 8.36622L11.973 5.5445H10.517V3.25879H15.893Z"
        fill={color}
      />
    </svg>
  );
}
