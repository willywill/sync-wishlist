import { makeExecutableSchema, gql } from 'apollo-server-koa';
import Wishlist, { resolver as wishlistResolver } from './Wishlist';

const SchemaDefinition = gql`
  schema {
    query: Query,
    mutation: Mutation,
  }
  # TODO: Remove hack here
  type Query {
    _: Boolean
  },
  type Mutation {
    _: Boolean
  },
`;

const rootResolver = {
  Query: {},
  Mutation: {},
};

const schema = makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    Wishlist,
  ],
  resolvers: [
    rootResolver,
    wishlistResolver,
  ],
});

export default schema;
