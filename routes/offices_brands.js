/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Office = require('../models/Office.js')


router.get('/:slug', function(req, res) {
    Office.find({slug: req.params.slug}, function (err, offices) {
        if (err) return next(err)
        res.json(offices)
    })
})

module.exports = router
