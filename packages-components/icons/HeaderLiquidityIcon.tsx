interface Props {
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function HeaderLiquidityIcon(props: Props) {
  const {width = 16, height = 16, color = '#8DCC2F'} = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.4">
        <path
          d="M7.26932 8.57603L8.78079 10.016L10.24 8.62403C10.3306 8.53825 10.4507 8.49069 10.5755 8.49123H13.8389C13.8453 8.38456 13.8491 8.27416 13.8491 8.1643C13.7809 6.68574 13.1585 5.28706 12.1057 4.24666C11.0529 3.20627 9.64695 2.60047 8.16768 2.54984C6.68842 2.49921 5.24433 3.00746 4.12287 3.97343C3.00141 4.93941 2.28481 6.29226 2.11572 7.7627H4.90666L6.55999 6.1835C6.65101 6.09869 6.77079 6.05154 6.89519 6.05154C7.01959 6.05154 7.13937 6.09869 7.23039 6.1835L9.07732 7.9435C9.11962 7.98616 9.1527 8.03706 9.17448 8.09305C9.19626 8.14904 9.20629 8.20891 9.20394 8.26895C9.20158 8.32898 9.1869 8.38788 9.16081 8.442C9.13472 8.49611 9.09777 8.54428 9.05226 8.5835C8.96282 8.66142 8.84821 8.70434 8.72959 8.70434C8.61097 8.70434 8.49636 8.66142 8.40692 8.5835L6.89492 7.1435L5.43626 8.5355C5.34549 8.62131 5.22516 8.66886 5.10026 8.6683H2.12479C2.3111 10.0218 2.95984 11.2692 3.96097 12.1989C4.9621 13.1286 6.254 13.6835 7.61757 13.7693C8.98113 13.8551 10.3324 13.4667 11.4422 12.6699C12.552 11.873 13.3521 10.7168 13.7067 9.39736H10.7733L9.11732 10.9766C9.02642 11.0616 8.9066 11.1089 8.78212 11.1089C8.65765 11.1089 8.53782 11.0616 8.44692 10.9766L6.59999 9.21656C6.55606 9.17564 6.52102 9.12611 6.49707 9.07105C6.47311 9.016 6.46075 8.9566 6.46075 8.89656C6.46075 8.83652 6.47311 8.77713 6.49707 8.72207C6.52102 8.66702 6.55606 8.61749 6.59999 8.57656C6.69089 8.49153 6.81071 8.44422 6.93519 8.44422C7.05966 8.44422 7.17949 8.49153 7.27039 8.57656L7.26932 8.57603Z"
          fill={color}
        />
      </g>
    </svg>
  );
}
