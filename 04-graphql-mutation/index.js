const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require('graphql');
const PORT = 4000;

// Construct a schema using GraphQL Schema Language
// Define a Query "hello", it returns String
// Define a data type
var schema = buildSchema(
  `
  input AccountInput {
    name: String
    age: Int
  }

  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input AccountInput): Account
  }

  type Account {
    name: String
    age: Int
  }
  `
)

const fackDb ={};

// The root provides a resolver funciton for each query
var root = {
  createAccount: ({input}) => {
    fackDb[input.name] = input;
    return fackDb[input.name]
  },
  updateAccount: ({id, input}) =>{
    const updatedAccount = Object.assign({}, fackDb[id], input);
    fackDb[id] = updatedAccount;
    return updatedAccount;
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
    getClassmates(classNo:2)
    account(name:"asdfasdf") {
      name
      age
    }
  }

  // result
  {
    "data": {
      "getClassmates": [
        "a2",
        "b2",
        "c2"
      ],
      "account": {
        "name": "asdfasdf",
        "age": 11111
      }
    }
  }
*/