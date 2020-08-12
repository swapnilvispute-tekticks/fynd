const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema({
  '99popularity': { type: Number },
  director: { type: String, required: true },
  genre: { type: [String], required: true },
  imdb_score: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  updated_by: { type: String, required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('movies', MovieSchema)
