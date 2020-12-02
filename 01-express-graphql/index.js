import express from 'express'
import graphqlHTTP from 'express-graphql'
import {buildSchema} from 'graphql'
    
const schema = buildSchema(`
  type Query {
    hello: String
    friend: Friend
  } 

  type Friend {
    id: ID
    name: String
  }
  `
)
// resolver
const root = { 
  hello: ()=>"Hi, GraphQL",
  friend: () => {return { id:1111, ddd:"ben"}}
}   

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,   // enable UI insterface
}));
app.listen(8964);

/* Test

query {
  hello
}

query {
	friend {
	  id
	}
}
*/