import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { dom } from '@fortawesome/fontawesome-svg-core';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    }
    finally {
      sheet.seal();
    }
  }

  componentDidMount = async () => {
    // Necessary for server side rendering of icons
    dom.css();
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="apple-touch-icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
          {/* NOTE: Choose some web fonts to load here */}
          {/* eslint-disable-next-line react/no-unknown-property */}
          <link rel="preconnect" href="https://fonts.gstatic.com/" />
          <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,500,700|Rubik:300,400,500,700&display=swap" rel="stylesheet" />
          <meta name="viewport" content="initial-scale=1, width=device-width, maximum-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default CustomDocument;
