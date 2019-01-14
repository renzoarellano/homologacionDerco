/*eslint-disable */
var express = require('express')
var router = express.Router()
var Client = require('../models/Admin.js')
var passport = require('passport')
require('../config/passport')(passport)

/* GET ALL CLIENTS */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Client.find(function (err, clients) {
        if (err) return next(err)
        var len = clients.length
        var arUsers = []
        for(var i=0; i<len; i++){
            arUsers.push({
                id: clients[i].id, 
                "first_name": clients[i].first_name,
                "last_name": clients[i].last_name,
                "role": clients[i].role,
                "brand": clients[i].brand,
                "email": clients[i].email,
                "created_at": clients[i].created_at,
            })
        }
        res.json(arUsers)
    })
  } else {
    return res.status(403).send({success: false, msg: 'user list'})
  }
})

/* GET SINGLE CLIENT BY ID */
router.get('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Client.findById(req.params.id, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'user list'})
  }
})

//SAVE CLIENT FROM INTERNET
// router.post('/', function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   Client.create(req.body, function (err, post) {
//     if (err) return next(err)
//     res.json(post)
//     // fetch('http://google.com/')
//     // .then(function(response) {
//     //   console.log("TEST", response)
//     // }, function(error) {
//     //   error.message //=> String
//     // })

//   })
  
// })

/* UPDATE CLIENT */
router.put('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {  
    Client.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'user list'})
  }
})

/* DELETE CLIENT */
router.delete('/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Client.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'user list'})
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
