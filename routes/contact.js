/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/Contact.js')
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

String.prototype.strip = function() {
  var translate_re = /[öäüÖÄÜßËë ]/g;
  var translate = {
    "ä":"a", "ö":"o", "ü":"u", "Ë":"e", "Ë":"e",
    "Ä":"A", "Ö":"O", "Ü":"U",
    " ":"-", "ß":"ss"  
  };
    return (this.replace(translate_re, function(match){
        return translate[match];})
    );
};

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
                subject: clients[i].subject,
                fullname: clients[i].fullname,
                phone: clients[i].phone,
                email: clients[i].email,
                store: clients[i].store,
                brand: clients[i].brand,
                slug: clients[i].brand.toLowerCase().strip(),
                message: clients[i].message,
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
