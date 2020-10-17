import React from 'react';
import compose from 'ramda/src/compose';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from 'react-apollo';
import withApolloClient from '../lib/graphql';
import '../lib/icons';

class CustomApp extends App {
  static async getInitialProps({ Component, ctx, apolloClient }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, apolloClient });
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <React.Fragment>
        <Head>
          <title>Title</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </React.Fragment>
    );
  }
}

export default compose(
  withApolloClient,
)(CustomApp);
