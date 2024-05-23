// @ts-ignore

interface Props {
  innerHtml: string;
  css: string[];
  styles: string;
  entry: string;
  lang: string[];
  pageData?: any;
}

const loadingStyle = `@keyframes breath-animation{0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.05);opacity:0.7;}}.breath-effect{animation:breath-animation 1.5s ease-in-out infinite;}`;
const fontStyle = `
      @font-face {
        font-family: PPNeueMachina;
        font-style: normal;
        font-weight: 300 400;
        font-display: swap;
        src: url(https://static.rate-x.io/font/v1/neue-machina/PPNeueMachina-InktrapRegular.woff2)
        format(woff2);
      }
      @font-face {
        font-family: PPNeueMachina;
        font-style: normal;
        font-weight: 500 700;
        font-display: swap;
        src: url(https://static.rate-x.io/font/v1/neue-machina/PPNeueMachina-InktrapBold.woff2)
        format(woff2);
      }
`;

export function ServerApp(props: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="shortcut icon" href="https://static.rate-x.io/img/v1/551d5a/rate-x.ico" />
        <title>RateX | World’s 1st leveraged Synthetic Yield exchange</title>
        <meta name="description" content="World’s 1st leveraged Synthetic Yield exchange" />
        <link rel="stylesheet" href="https://static.rate-x.io/css/global-fe5a7a.css"></link>
        <script src="https://static.rate-x.io/3rd/react/18.2.0/react.production.min.js"></script>
        <script src="https://static.rate-x.io/3rd/react/18.2.0/react-dom.production.min.js"></script>
        {(props?.lang || []).map((lang) => (
          <script key={lang} type="module" src={lang}></script>
        ))}
        {(props?.css || []).map((file) => (
          <link key={file} rel="stylesheet" href={file}></link>
        ))}
        {props.styles}
        <style>{fontStyle}</style>
        <style>{loadingStyle}</style>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: props.innerHtml}}></div>
        <div id="popup"></div>
        <script type="module" src={props.entry}></script>
      </body>
    </html>
  );
}
