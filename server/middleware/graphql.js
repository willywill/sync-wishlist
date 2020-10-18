import { ApolloServer } from 'apollo-server-koa';
import schema from '../graphql/schema';

export const apolloServer = new ApolloServer({
  schema,
  rootValue: {},
  context: ({ ctx }) => ctx,
});

const graphql = app => {
  apolloServer.applyMiddleware({
    app,
    path: '/api/graphql',
  });

  return (ctx, next) => next();
};

export default graphql;
