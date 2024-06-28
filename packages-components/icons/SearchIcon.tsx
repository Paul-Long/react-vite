interface Props {
  className?: string;
  width?: number | string;
  height?: number | string;
  color?: string;
}
export function SearchIcon(props: Props) {
  const {className, width = 16, height = 16, color = 'white'} = props;
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
        d="M14.2652 13.7352L11.0539 10.5239C11.9696 9.47081 12.4407 8.1033 12.3679 6.70965C12.295 5.31599 11.6838 4.00507 10.6633 3.05322C9.64269 2.10137 8.29241 1.58296 6.89706 1.60726C5.50171 1.63156 4.1703 2.19668 3.18349 3.18349C2.19668 4.1703 1.63156 5.50171 1.60726 6.89706C1.58296 8.29241 2.10137 9.64269 3.05322 10.6633C4.00507 11.6838 5.31599 12.295 6.70965 12.3679C8.1033 12.4407 9.47081 11.9696 10.5239 11.0539L13.7352 14.2652C13.8063 14.3314 13.9003 14.3675 13.9974 14.3658C14.0946 14.364 14.1873 14.3247 14.256 14.256C14.3247 14.1873 14.364 14.0946 14.3658 13.9974C14.3675 13.9003 14.3314 13.8063 14.2652 13.7352ZM2.37517 7.00017C2.37517 6.08543 2.64642 5.19123 3.15462 4.43065C3.66282 3.67008 4.38515 3.07728 5.23025 2.72722C6.07536 2.37717 7.0053 2.28558 7.90246 2.46403C8.79962 2.64249 9.62372 3.08298 10.2705 3.7298C10.9174 4.37661 11.3578 5.20071 11.5363 6.09787C11.7148 6.99504 11.6232 7.92497 11.2731 8.77008C10.9231 9.61518 10.3303 10.3375 9.56968 10.8457C8.8091 11.3539 7.9149 11.6252 7.00017 11.6252C5.774 11.6237 4.59847 11.1359 3.73144 10.2689C2.86441 9.40186 2.37665 8.22634 2.37517 7.00017Z"
        fill={color}
      />
    </svg>
  );
}