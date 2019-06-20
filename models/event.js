// schema could be said "our plan"
// model is a blueprint which incorporates that plan which then can be used to create object which we are actually going to work with our application

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//since Schema is a constructor function, we can create new object with a 'new' keyword
const eventSchema = new Schema({
          title: {
                    type: String,
                    required: true
          },
          description: {
                    type: String,
                    required: true
          },
          price: {
                    type: Number,
                    required: true
          },
          date: {
                    type: Date,
                    required: true
          }

})

module.exports = mongoose.model('Event', eventSchema)