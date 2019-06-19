const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express();
app.use(bodyParser.json())
// console.log(appUse);

app.get('/', (req, res, next) =>{
          res.send("Hellosdfff")
})

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`
          type Event {
                    _id: ID!
          }

          type RootQuery {
                    events: [String!]!
          }

          type RootMutation {
                    createEvent(name: String): String
          }

          schema {
                    query: RootQuery
                    mutation: RootMutation
          }
          `),
    rootValue: {
          events: () => {
                    return ['Romantic Cooking', 'All night coding', 'Sailing']
          },
          createEvent: (args) => {
                    const eventName = args.name;
                    return eventName;
          }
    },
    graphiql: true
  })
);
app.listen(3000) 