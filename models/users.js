const mongoose = require('mongoose')

const MovieSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true }
}, {
  timestamps: true
})

module.exports = mongoose.model('users', MovieSchema)
