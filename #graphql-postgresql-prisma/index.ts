import { ApolloServer } from "apollo-server";
import { DateTimeResolver } from "graphql-scalars";
import { Context, context } from "./context";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { argsToArgsConfig } from "graphql/type/definition";

const typeDefs = `
type Query {
  allUsers: [User!]!
  postById(id: Int!): Post
  feed(searchString: String, skip: Int, take: Int): [Post!]!
  draftsByUser(id: Int!): [Post]
}
type Mutation {
  signupUser(name: String, email: String!): User!
  createDraft(title: String!, content: String, authorEmail: String): Post
  incrementPostViewCount(id: Int!): Post
  deletePost(id: Int!): Post
}
type User {
  id: Int!
  email: String!
  name: String
  posts: [Post!]!
}
type Post {
  id: Int!
  createdAt: DateTime!
  updatedAt: DateTime!
  title: String!
  content: String
  published: Boolean!
  viewCount: Int!
  author: User
}
scalar DateTime
`;

const resolvers = {
  Query: {
    allUsers: (_parent, _args, context: Context) => {
      return context.prisma.user.findMany();
    },
    postById: (_parent, args: { id: number }, context: Context) => {
      // TODO
      return context.prisma.post.findMany();
    },
    feed: (
      _parent,
      args: {
        searchString: string | undefined;
        skip: number | undefined;
        take: number | undefined;
      },
      context: Context
    ) => {
      return context.prisma.post.findMany({
        where :{
          published: true,
          OR:[
            {title:{contains:args.searchString}},
            {content:{contains:args.searchString}}
          ]
        }
      });
    },
    draftsByUser: (_parent, args: { id: number }, context: Context) => {
      // TODO
    },
  },
  Mutation: {
    signupUser: (
      _parent,
      args: { name: string | undefined; email: string },
      context: Context
    ) => {
      // TODO
    },
    createDraft: (
      _parent,
      args: { title: string; content: string | undefined; authorEmail: string },
      context: Context
    ) => {
      // TODO
    },
    incrementPostViewCount: (
      _parent,
      args: { id: number },
      context: Context
    ) => {
      // TODO
    },
    deletePost: (_parent, args: { id: number }, context: Context) => {
      // TODO
    },
  },
  Post: {
    author: (parent, _args, context: Context) => {
      return null;
    },
  },
  User: {
    posts: (parent, _args, context: Context) => {
      return [];
    },
  },
  DateTime: DateTimeResolver,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});
server.listen({ port: 8964 }, () =>
  console.log(`🚀 Server ready at: http://localhost:8964`)
);