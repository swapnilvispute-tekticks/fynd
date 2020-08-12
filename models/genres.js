const mongoose = require('mongoose')

const GenreSchema = mongoose.Schema({
  name: { type: String, required: true },
  updated_by: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('genres', GenreSchema)
