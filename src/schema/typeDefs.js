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

type Query {
  movies: [Movie]
  movie(id: Int!): Movie
}

type Mutation {
  destroyMovie(id: Int): Movie
  createMovie(options: MovieOption): Movie
  updateMovie(id: Int!, options: MovieOption): Movie
}

type Subscription {
  movieCreated: Movie
  movieUpdated: Movie
  movieDestroyed: Movie
}
`

module.exports = {
  typeDefs
}
