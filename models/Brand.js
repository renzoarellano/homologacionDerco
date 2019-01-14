var mongoose = require('mongoose')

var BrandSchema = new mongoose.Schema({
  name: String,
  slug: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Brand', BrandSchema)
