const { gql } = require('apollo-server');

const typeDefs = gql`
input MovieOption {
  title: String
  durationInMinutes: Int
}

type Movie {
  id: ID!
  title: String
  durationInMinutes: Int
}

type User {
  id: ID!
  email: String!
}

type Query {
  movies: [Movie]
  movie(id: ID!): Movie
  users: [User]
  user(id: ID!): User
}

type Mutation {
  destroyMovie(id: ID!): Movie
  createMovie(options: MovieOption): Movie
  updateMovie(id: ID!, options: MovieOption): Movie
  destroyUser(id: ID!): User
  createUser(email: String!): User
  updateUser(id: ID!, email: String!): User
}

type Subscription {
  userCreated: User
}
`

module.exports = {
  typeDefs
}
