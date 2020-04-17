const { PubSub } = require('apollo-server');

const { movies, users } = require('../data/movies')

const USER_CREATED = 'USER_CREATED'
const pubSub = new PubSub()

const store = {
  movies: [...movies],
  users: [...users]
}

const resolvers = {
  Query: {
    movies: () => store.movies,
    movie: (_parent, args, _context, _info) => store.movies.find(movie => movie.id === args.id),
    users: () => store.users,
    user: (_parent, args,) => store.users.find(user => user.id === args.id),
  },
  Mutation: {
    destroyMovie: (_parent, args) => {
      deletedMovie = store.movies.find(movie => movie.id === args.id)
      store.movies = store.movies.filter(movie => movie.id !== args.id)
      return deletedMovie
    },
    createMovie: (_parent, args) => {
      createdMovie = {...args.options, id: Date.now() + ''}
      store.movies.push(createdMovie)
      return createdMovie
    },
    updateMovie: (_parent, args) => {
      const movieToUpdate = store.movies.find(movie => movie.id === args.id)
      const updatedMovie = {...movieToUpdate, ...args.options}
      store.movies = store.movies.filter(movie => movie.id !== args.id)
      store.movies.push(updatedMovie)
      return updatedMovie
    },
    destroyUser: (_parent, args) => {
      deletedUser = store.users.find(user => user.id === args.id)
      store.users = store.users.filter(user => user.id !== args.id)
      return deletedUser
    },
    createUser: (_parent, args) => {
      createdUser = { id: Date.now() + '', email: args.email}
      store.users.push(createdUser)
      console.log({ createdUser })
      pubSub.publish(USER_CREATED, { userCreated: createdUser })
      return createdUser
    },
    updateUser: (_parent, args) => {
      const userToUpdate = store.users.find(user => user.id === args.id)
      const updatedUser = {...userToUpdate, ...args.email}
      store.users = store.users.filter(user => user.id !== args.id)
      store.users.push(updatedUser)
      return updatedUser
    }
  },
  Subscription: {
    userCreated: {
      subscribe: () => pubSub.asyncIterator([USER_CREATED])
    },
  }
}

module.exports = {
  resolvers
}
