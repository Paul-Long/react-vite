// @ts-ignore
import React from 'react';

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
        {/*<link rel="shortcut icon" href="https://static.phemex.com/s/common/favicon-v2.ico" />*/}
        <title>RateX</title>
        <meta name="description" content="Put your description here." />
        <link rel="stylesheet" href="/css/global-6050f2.css"></link>
        <link
          rel="stylesheet"
          href="/css/global-xs-2a91a5.css"
          media="screen and (max-width:640px)"
        ></link>
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
