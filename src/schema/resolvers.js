const { PubSub } = require('apollo-server');

const { movies } = require('../data/movies')

const pubSub = new PubSub()

const store = {
  movies: [...movies]
}

const resolvers = {
  Query: {
    movies: () => store.movies,
    movie: (_parent, args, _context, _info) => store.movies.find(movie => movie.id === args.id),
  },
  Mutation: {
    destroyMovie: (_parent, args) => {
      deletedMovie = store.movies.find(movie => movie.id === args.id)
      store.movies = store.movies.filter(movie => movie.id !== args.id)
      pubSub.publish('MOVIE_DESTROYED', { movieDestroyed: deletedMovie })
      return deletedMovie
    },
    createMovie: (_parent, args) => {
      createdMovie = {...args, id: Date.now()}
      store.movies.push(createdMovie)
      pubSub.publish('MOVIE_CREATED', { movieAdded: createdMovie })
      return createdMovie
    },
    updateMovie: (_parent, args) => {
      const movieToUpdate = store.movies.find(movie => movie.id === args.id)
      const updatedMovie = {...movieToUpdate, ...args.options}
      store.movies = store.movies.filter(movie => movie.id !== args.id)
      store.movies.push(updatedMovie)
      pubSub.publish('MOVIE_UPDATED', { movieUpdated: updatedMovie })
      return updatedMovie
    }
  },
  Subscription: {
    movieCreated: {
      subscribe: () => pubSub.asyncIterator(['MOVIE_CREATED'])
    },
    movieUpdated: {
      subscribe: () => pubSub.asyncIterator(['MOVIE_UPDATED'])
    },
    movieDestroyed: {
      subscribe: () => pubSub.asyncIterator(['MOVIE_DESTROYED'])
    }
  }
}

module.exports = {
  resolvers
}
