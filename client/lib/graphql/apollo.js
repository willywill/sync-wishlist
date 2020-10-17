import { useMemo } from 'react';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { isBrowser } from '../../utils';
import { GRAPHQL_URL } from '../../constants';

let apolloClient;

const createApolloClient = () => new ApolloClient({
  ssrMode: !isBrowser,
  link: new HttpLink({
    uri: GRAPHQL_URL, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  }),
  cache: new InMemoryCache(),
});

export const initializeApollo = (initialState = null) => {
  const currApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    currApolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (!isBrowser) return currApolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = currApolloClient;

  return currApolloClient;
};

export const useApollo = (initialState) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
};
