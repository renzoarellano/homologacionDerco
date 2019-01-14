/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/Client.js')


router.get('/', function(req, res) {
  Client.find(function (err, clients) {
        if (err) return next(err)
        res.json(clients)
    })
})

module.exports = router
