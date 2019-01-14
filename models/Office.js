var mongoose = require('mongoose')

var OfficeSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  department: String,
  brand: String,
  slug: String,
  status: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Office', OfficeSchema)