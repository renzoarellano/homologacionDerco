var mongoose = require('mongoose')

var TestDriveSchema = new mongoose.Schema({
  model: String,
  fullname: String,
  dni: String,
  email: String,
  phone: String,
  store: String,
  slug: String,
  brand: String,
  terms: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('TestDrive', TestDriveSchema)
