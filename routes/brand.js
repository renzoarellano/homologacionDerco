/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Brand = require('../models/Brand.js')
var passport = require('passport')
require('../config/passport')(passport)

/* GET ALL BRANDS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers)
  if (token) {
    Brand.find(function (err, brands) {
      if (err) return next(err)
      res.json(brands)
    })
  } else {
    return res.status(403).send({success: false, msg: 'test.'})
  }
})

/* GET SINGLE BRAND BY ID */
router.get('/:id', function(req, res, next) {
  Brand.findById(req.params.id, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* GET SINGLE BRAND BY SLUG */
router.get('/slug/:slug', function(req, res, next) {
  Brand.find({slug: req.params.slug}, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* SAVE BRAND */
router.post('/', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    Brand.create(req.body, function (err, post) {
      if (err) return next(err)
      res.json(post)
    })
    
  })

/* UPDATE BRAND */
router.put('/:id', function(req, res, next) {
  Brand.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err)
    res.json(post)
  })
})

/* DELETE BRAND */
router.delete('/:id', function(req, res, next) {
  Brand.findByIdAndRemove(req.params.id, req.body, function (err, post) {
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
