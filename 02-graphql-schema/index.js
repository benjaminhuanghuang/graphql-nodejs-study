const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const PORT = 4000;

// Construct a schema using GraphQL Schema Language
// Define a Query "hello", it returns String
// Define a data type
var schema = buildSchema(
  `
  type Query {
    hello: String
    age: Int
    account: Account
  }

  type Account {
    name: String
    age: Int
  }
  `
)

// The root provides a resolver funciton for each query
var root = {
  hello: () => {
    return 'The result of hello';
  },
  age: () => {
    return 99;
  },
  account :()=>{
    return {
      name: "ben",
      age: "99"
    }
  }
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Express sever is running at port ${PORT}`);
});

/*
  Open http://localhost:4000/graphql
  
  // query
  {
    hello
    age
    account{
      name
    }
  }

  // result
  {
  "data": {
    "hello": "The result of hello",
    "age": 99
  }
}
*/