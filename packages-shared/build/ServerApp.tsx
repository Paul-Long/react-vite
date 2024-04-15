// @ts-ignore

interface Props {
  innerHtml: string;
  css: string[];
  styles: string;
  entry: string;
  lang: string[];
  pageData?: any;
}

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
        <link rel="shortcut icon" href="https://static.rate-x.io/img/v1/536be9/logo.svg" />
        <title>RateX</title>
        <meta name="description" content="Put your description here." />
        <link rel="stylesheet" href="https://static.rate-x.io/css/global-cc28fb.css"></link>
        <script src="https://static.rate-x.io/3rd/react/18.2.0/react.production.min.js"></script>
        <script src="https://static.rate-x.io/3rd/react/18.2.0/react-dom.production.min.js"></script>
        {(props?.lang || []).map((lang) => (
          <script key={lang} type="module" src={lang}></script>
        ))}
        {(props?.css || []).map((file) => (
          <link key={file} rel="stylesheet" href={file}></link>
        ))}
        {props.styles}
        <></>
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{__html: props.innerHtml}}></div>
        <div id="popup"></div>
        <script type="module" src={props.entry}></script>
      </body>
    </html>
  );
}
