var mongoose = require('mongoose')

var ClientSchema = new mongoose.Schema({
  id_w2l: Number,
  rut_w2l: Number,
  first_name: String,
  last_name: String,
  fone1_w2l: String,
  email: String,
  state: String,
  url1_w2l: String,
  url2_w2l: String,
  brand_w2l: String,
  marca2: String,
  model_w2l: String,
  version_w2l: String,
  sap_w2l: String,
  price_w2l: String,
  local_w2l: String,
  cod_origen2_w2l: String,
  store: String,
  terms: String,
  tipo_documento: String,
  razon_social: String,
  direccion: String,
  distrito: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Client', ClientSchema)
