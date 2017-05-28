const mongoose = require('mongoose')
const Schema = mongoose.Schema

let memoSchema = new Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

let Memo = mongoose.model('Memo', memoSchema)

module.exports = Memo