import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
 type Note {
  _id: ID!
  title: String!,
  content: String!,
  createdAt: Date,
  updatedAt: Date
 }

 scalar Date

 type Query {
  allNotes: [Note]
  findNoteById(id: Int!): Note
 }

 type Mutation {
  createNote(title: String!, content: String!) : Note
  updateNote(id: Int!, title: String!, content: String!) : Note
 }
 `;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;