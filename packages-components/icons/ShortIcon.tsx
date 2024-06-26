interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function ShortIcon(props: Props) {
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
      <g opacity="0.6">
        <path
          d="M15.893 12.7413V7.36592H13.6073V8.85734L9.15189 4.40135L5.9376 7.61506L1.91532 3.59277L0.299316 5.20992L5.9376 10.8482L9.15189 7.63449L11.973 10.4562H10.517V12.7419H15.893V12.7413Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
