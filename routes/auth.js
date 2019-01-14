/*eslint-disable */
var mongoose = require('mongoose')
var passport = require('passport')
var settings = require('../config/settings')
require('../config/passport')(passport)
var express = require('express')
var jwt = require('jsonwebtoken')
var router = express.Router()
var Admin = require("../models/Admin")

router.post('/register', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please introduce username and password.'})
  } else {
    var newAdmin = new Admin({
      first_name: req.body.first_name,
      last_name: req.body.last_name, 
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      brand: req.body.brand,
    })
    // save the user
    newAdmin.save(function(err) {
      if (err) {
        console.log(err, res)
        return res.json({success: false, msg: 'email already exists.'})
      }
      res.json({success: true, msg: 'Successful created new user.'})
    })
  }
})

router.post('/login', function(req, res) {
  Admin.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err
    if (!user) {
      res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          var token = jwt.sign(user.toJSON(), settings.secret)
          res.json({ success: true, token: 'JWT ' + token, role: user.role, brand: user.brand })
        } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' })
        }
      })
    }
  })
})

module.exports = router
