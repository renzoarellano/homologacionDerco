/*eslint-disable */
var express = require('express')
var router = express.Router()
var Client = require('../models/Client.js')
var passport = require('passport')
require('../config/passport')(passport)
var t_day = new Date()
var tday = ("0" + t_day.getDate()).slice(-2)
var tmonth = ("0" + (t_day.getMonth() + 1)).slice(-2)

router.get('/:brand/:today/:page', function(req, res) {
    var perPage = 10
    var page = req.params.page || 1

    Client
    .find({brand_w2l: req.params.brand, created_at: { $gte: new Date(t_day.getFullYear() + '-' + tmonth + '-' + tday + ' 00:00:00') }})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .exec(function(err, clients) {
        if (err) return next(err)
        Client.countDocuments().exec(function(err, count) {
            if (err) return next(err)
            res.json(clients)
        })
    })
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
            Client.countDocuments({ brand_w2l: req.params.brand, created_at: { $gte: new Date(req.params.date1+' 00:00:00'), $lt: new Date(req.params.date2+' 23:59:59') }}).exec(function(err, count) {
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

module.exports = router
