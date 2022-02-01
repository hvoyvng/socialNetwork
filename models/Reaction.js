const { Schema, model } = require('mongoose')

const Reaction = new Schema ({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  thought: {
    type: Schema.Types.ObjectId,
    ref: 'thought',
    required: true
  }
}, { timestamps: true })

module.exports = model('reaction', Reaction)