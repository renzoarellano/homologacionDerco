/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/Client.js')
var passport = require('passport')
require('../config/passport')(passport)

//SAVE CLIENT FROM INTERNET
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Client.create(req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'})
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
