const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')


const app = express();
app.use(bodyParser.json())

const events = [];
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
                    title: String!
                    description: String!
                    price: Float!
                    date: String!
          }

          input EventInput {
                    title: String!
                    description: String!
                    price: Float!
                    date: String!
          }

          type RootMutation {
                    createEvent(eventInput: EventInput): Event
          }

          type RootQuery {
                    events: [Event!]!
          }

          schema {
                    query: RootQuery
                    mutation: RootMutation
          }
          `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: function(args) {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

mongoose.connect('')
app.listen(3000) 