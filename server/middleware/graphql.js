import { ApolloServer } from 'apollo-server-koa';
import logger from 'winston';
import schema from '../graphql/schema';

const context = {
  info: logger.info,
  warn: logger.warn,
  error: logger.error,
};

export const apolloServer = new ApolloServer({
  schema,
  rootValue: {},
  context,
});

const graphql = app => {
  apolloServer.applyMiddleware({
    app,
    path: '/api/graphql',
  });

  return (ctx, next) => next();
};

export default graphql;
