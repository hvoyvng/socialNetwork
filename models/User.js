const { Schema, model } = require('mongoose')

const User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }]
}, { toJSON: { virtuals: true }, id: false })

User.virtual('friendCount').get(function () {
  return this.friends.length
})

module.exports = model('user', User)