/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/TestDrive.js')
var passport = require('passport')
require('../config/passport')(passport)

/* GET ALL CLIENTS */
// router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers)
//   if (token) {
//     Client.find(function (err, clients) {
//       if (err) return next(err)
//       res.json(clients)
//     })
//   } else {
//     return res.status(403).send({success: false, msg: 'test.'})
//   }
// })

router.get('/', function(req, res) {
    Client.find(function (err, clients) {
        if (err) return next(err)
        res.json(clients)
    })
})

router.get('/:brand', function(req, res) {
  Client.find({brand: req.params.brand}, function (err, clients) {
        if (err) return next(err)
        var len = clients.length
        var arrClients = []
        for(var i=0; i<len; i++){
            var d = new Date( clients[i].created_at);
            var n = d.toLocaleString('es-PE');
            arrClients.push({
                id: clients[i].id,
                model: clients[i].model,
                fullname: clients[i].fullname,
                dni: clients[i].dni,
                email: clients[i].email,
                phone: clients[i].phone,
                store: clients[i].store,
                slug: clients[i].brand.toLowerCase().strip(),
                brand: clients[i].brand,
                terms: clients[i].terms,
                created_at: n
            })
        }
        res.json(arrClients)
    })
})

/* GET SINGLE CONTACT BY ID */
router.get('/:brand/:id', function(req, res, next) {
  Client.findById(req.params.id, function (err, post) {
    if (err) return next(err)
        var d = new Date( post.created_at);
        var n = d.toLocaleString('es-PE');
        var npost = {
          id: post.id,
          model: post.model,
          fullname: post.fullname,
          dni: post.dni,
          email: post.email,
          phone: post.phone,
          store: post.store,
          slug: post.brand.toLowerCase().strip(),
          brand: post.brand,
          terms: post.terms,
          created_at: n
      }
      res.json(npost)
  })
})

/* GET SINGLE CLIENT BY ID */
router.get('/:id', function(req, res, next) {
  Client.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
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
  })
  
})

/* UPDATE CLIENT */
router.put('/:id', function(req, res, next) {
  Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE CLIENT */
router.delete('/:id', function(req, res, next) {
  Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
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
