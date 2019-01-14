/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/Client.js')
var passport = require('passport')
var fetch = require("node-fetch");
require('../config/passport')(passport)

/* GET ALL CLIENTS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Client.find(function (err, clients) {
      if (err) return next(err)
      res.json(clients)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* GET EXCEL CLIENTS */
router.get('/excel/:brand/:date1/:date2', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(req.params.date1+' 00:00:00'), $lt: new Date(req.params.date2+' 23:59:59') }}, function (err, clients) {
      if (err) return next(err)
      res.json(clients)
    })
  } else {
    return res.status(403).send({success: false, msg: 'excel generated.'})
  }
})

/* GET SEARCH CLIENTS */
router.get('/search/:brand/:date1/:date2/:page', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    
  var perPage = 50
  var page = req.params.page || 1

  Client
      .find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(req.params.date1+' 00:00:00'), $lt: new Date(req.params.date2+' 23:59:59') }})
      .sort({created_at:-1}) 
      .skip((perPage * page) - perPage)
      .limit(perPage)
      .exec(function(err, clients) {
          if (err) return next(err)
          Client.countDocuments({ brand_w2l: req.params.brand, created_at: { $gte: req.params.date1+' 00:00:00.000Z', $lt: new Date(req.params.date2+' 23:59:59') }}).exec(function(err, count) {
              if (err) return next(err)
              var total = Math.ceil(count / perPage);
              var len = clients.length
              var arrClients = []
              for(var i=0; i<len; i++){
                  var d = new Date( clients[i].created_at);
                  var n = d.toLocaleString('es-PE');
                  arrClients.push({
                      id: clients[i].id,
                      id_w2l: clients[i].id_w2l,
                      rut_w2l: clients[i].rut_w2l,
                      first_name: clients[i].first_name,
                      last_name: clients[i].last_name,
                      fone1_w2l: clients[i].fone1_w2l,
                      email: clients[i].email,
                      state: clients[i].state,
                      url1_w2l: clients[i].url1_w2l,
                      url2_w2l: clients[i].url2_w2l,
                      brand_w2l: clients[i].brand_w2l,
                      model_w2l: clients[i].model_w2l,
                      version_w2l: clients[i].version_w2l,
                      sap_w2l: clients[i].sap_w2l,
                      price_w2l: clients[i].price_w2l,
                      local_w2l: clients[i].local_w2l,
                      cod_origen2_w2l: clients[i].cod_origen2_w2l,
                      store: clients[i].store,
                      terms: clients[i].terms,
                      tipo_documento: clients[i].tipo_documento,
                      razon_social: clients[i].razon_social,
                      direccion: clients[i].direccion,
                      distrito: clients[i].distrito,
                      created_at: n,
                      total: total,
                      count: count 
                  })
              }
              res.json(arrClients)
          })
      })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* GET SINGLE CLIENT BY ID */
router.get('/user/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Client.findById(req.params.id, function (err, post) {
      if (err) return next(err)
        var d = new Date( post.created_at);
        var n = d.toLocaleString('es-PE');
        var npost = {
        id: post.id,
        id_w2l: post.id_w2l,
        rut_w2l: post.rut_w2l,
        first_name: post.first_name,
        last_name: post.last_name,
        fone1_w2l: post.fone1_w2l,
        email: post.email,
        state: post.state,
        url1_w2l: post.url1_w2l,
        url2_w2l: post.url2_w2l,
        brand_w2l: post.brand_w2l,
        model_w2l: post.model_w2l,
        version_w2l: post.version_w2l,
        sap_w2l: post.sap_w2l,
        price_w2l: post.price_w2l,
        local_w2l: post.local_w2l,
        cod_origen2_w2l: post.cod_origen2_w2l,
        store: post.store,
        terms: post.terms,
        tipo_documento: post.tipo_documento,
        razon_social: post.razon_social,
        direccion: post.direccion,
        distrito: post.distrito,
        created_at: n
      }
      res.json(npost)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

//SAVE CLIENT FROM INTERNET
router.post('/', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  Client.create(req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
    // fetch('http://google.com/')
    // .then(function(response) {
    //   console.log("TEST", response)
    // }, function(error) {
    //   error.message //=> String
    // })

  })
  
})

/* UPDATE CLIENT */
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* DELETE CLIENT */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

module.exports = router
