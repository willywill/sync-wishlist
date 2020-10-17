import { makeExecutableSchema, gql } from 'apollo-server-koa';

const SchemaDefinition = gql`
  schema {
    query: Query,
    mutation: Mutation,
  }
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
  ],
  resolvers: [
    rootResolver,
  ],
});

export default schema;
