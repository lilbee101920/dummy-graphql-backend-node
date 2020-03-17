const { ApolloServer } = require('apollo-server');

const { typeDefs, resolvers } = require('./schema')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (arg) => ({
    arg: arg,
    db: {},
  }),
  subscriptions: {
    onConnect: (connectionParams, websocket, context) => {
      console.log('Client connected')
    },
    onDisconnect: (websocket, context) => {
      console.log('Client disconnected')
    }
  },
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Listening at ${url}`)
  console.log(`Listening at ${subscriptionsUrl}`)
})
