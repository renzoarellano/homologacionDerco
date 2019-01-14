var mongoose = require('mongoose')

var ContactSchema = new mongoose.Schema({
  subject: String,
  fullname: String,
  phone: String,
  email: String,
  store: String,
  brand: String,
  slug: String,
  message: String,
  terms: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Contact', ContactSchema)
