import React from 'react';
import { func, shape } from 'prop-types';
import Head from 'next/head';
import { getDataFromTree } from 'react-apollo';
import { initializeApollo } from './apollo';
import { isBrowser } from '../../utils';

export default App => class Apollo extends React.Component {
    static displayName = 'withApollo(App)';

    static propTypes = {
      apolloClient: func,
      apolloState: shape({}).isRequired,
    }

    static defaultProps = {
      apolloClient: undefined,
    };

    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};

      const apollo = initializeApollo();

      if (App.getInitialProps) {
        appProps = await App.getInitialProps({ Component, router, ctx, apolloClient: apollo });
      }

      /**
       * Run all GraphQL queries in the component tree
       * and extract the resulting data
       */
      if (!isBrowser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />,
          );
        }
        catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          // eslint-disable-next-line no-console
          console.error('Error while running `getDataFromTree`', error);
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = props.apolloClient || initializeApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
};
