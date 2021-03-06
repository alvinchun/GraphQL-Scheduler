const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const Event = require('./models/event')

const app = express();
app.use(bodyParser.json())

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
          Event.find()
          .then(events => {
                    return events.map(event => {
                              return { ...event._doc };
                    })
          }).catch(err => {
                    throw err;
          })
      },
      createEvent: function(args) {
//         const event = {
//           _id: Math.random().toString(),
//           title: args.eventInput.title,
//           description: args.eventInput.description,
//           price: +args.eventInput.price,
          // get it as a string but we expect it's to be the String that can be parsed into a Date object
//           date: new Date (args.eventInput.date)
//         };

        //mongose based model, it's not plain JS object
const event = new Event({
  title: args.eventInput.title,
  description: args.eventInput.description,
  price: +args.eventInput.price,
  date: new Date (args.eventInput.date)
});
        return event
        .save()
        .then(result => {
                  console.log(result);
                  return { ...result._doc };
        })
        .catch(err=>{console.log(err)
          throw err;
});
        
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
      //     which data base it's get stored = MONGO_DB
    }@graphql-scheduler-pruf8.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority
`
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });

