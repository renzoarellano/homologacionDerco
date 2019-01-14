/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Office = require('../models/Office.js')
var passport = require('passport')
require('../config/passport')(passport)

/* GET ALL OFFICES */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Office.find(function (err, offices) {
      if (err) return next(err)
      res.json(offices)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* GET SINGLE OFFICE BY ID */
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Office.findById(req.params.id, function (err, post) {
    if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* SAVE OFFICE */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Office.create(req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* UPDATE OFFICE */
router.put('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) {
    Office.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
      res.json(post)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* DELETE OFFICE */
router.delete('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers)
  if (token) { 
    Office.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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
