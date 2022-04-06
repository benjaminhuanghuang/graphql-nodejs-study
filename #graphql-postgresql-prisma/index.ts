import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { context } from './context'

const server = new ApolloServer({
  schema: schema,
  context: context,
})

const port = process.env.PORT || 9090;


server.listen({port}).then(async ({ url }) => {
  console.log(`Server ready at: ${url}`)
})