/*eslint-disable */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Client = require('../models/Client.js')
var passport = require('passport')
var fetch = require("node-fetch");
require('../config/passport')(passport)
fs = require('fs');

'use strict';
const nodemailer = require('nodemailer');

var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
var diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
}

function exportCSVFile(headers, items, fileTitle) {
  if (headers) {
      items.unshift(headers);
  }

  var jsonObject = JSON.stringify(items);
  var csv = "\ufeff"+convertToCSV(jsonObject);
  var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

  fs.writeFile('./dist/' + exportedFilenmae, csv, function (err) {
    if (err) return console.log(err);
  });
}

var headers = {
  first_name: 'Nombre'.replace(/,/g, ''),
  last_name: 'Apellido'.replace(/,/g, ''),
  brand_w2l: 'Marca'.replace(/,/g, ''),
  rut_w2l: 'DNI',
  email: 'Correo electrónico',
  model_w2l: 'Modelo del auto',
  fone1_w2l: 'Celular',
  local_w2l: 'Local',
  distrito: 'Distrito',
  store: 'Tienda',
  created_at: 'Fecha de ingreso',
  direccion: 'Dirección'
};

/* SEND MAIL REPORT */
var week_ago = new Date()
var w_day = new Date(week_ago.setDate(week_ago.getDate() - 7))
var wday = ("0" + w_day.getDate()).slice(-2);
var wmonth = ("0" + (w_day.getMonth() + 1)).slice(-2)

var today = new Date()
var y_day = new Date(today.setDate(today.getDate() - 1))
var yday = ("0" + y_day.getDate()).slice(-2);
var ymonth = ("0" + (y_day.getMonth() + 1)).slice(-2)

var t_day = new Date()
var tday = ("0" + t_day.getDate()).slice(-2)
var tmonth = ("0" + (t_day.getMonth() + 1)).slice(-2)

router.get('/:brand/0', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 18:30:00'), $lt: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 23:59:59') }}, function (err, clients) {
    if (err) return next(err)
      var itemsNotFormatted = clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''),
          last_name: item.last_name.replace(/,/g, ''),
          brand_w2l: item.brand_w2l,
          rut_w2l: item.rut_w2l,
          email: item.email,
          model_w2l: item.model_w2l,
          fone1_w2l: item.fone1_w2l,
          local_w2l: item.local_w2l,
          distrito: item.distrito,
          store: item.store,
          created_at: n,
          direccion: item.direccion,
        });
      });

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_diario_18_30-23_59_59-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com',
            port: 465,
            secure: true,
            auth: {
                user: 'webmaster@cotizadorderco.com',
                pass: '...seasons'
            }
        });

        let mailOptions = {
            from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
            to: 'jmondragonc@gmail.com',
            subject: 'Reporte Diario - Día ' + diasSemana[y_day.getDay()] + ", " + y_day.getDate() + " de " + meses[y_day.getMonth()] + " del " + y_day.getFullYear() + ' [18:30h - 23:29:59h] ✔',
            text: 'Reporte diario correspondiente al ' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '. Horas: 18:30h - 23:59:59h',
            html: 'Reporte diario correspondiente al <strong>' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '</strong>. Horas: <strong>18:30h - 23:59:59h</strong>',
            attachments: [
              {   
                  filename: fileTitle + '.csv',
                  path: './dist/' + fileTitle + '.csv'
              },
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
  })
})


router.get('/:brand/1', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 18:30:00'), $lt: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 23:59:59') }}, function (err, clients) {
    if (err) return next(err)
      var itemsNotFormatted = clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''),
          last_name: item.last_name.replace(/,/g, ''),
          brand_w2l: item.brand_w2l,
          rut_w2l: item.rut_w2l,
          email: item.email,
          model_w2l: item.model_w2l,
          fone1_w2l: item.fone1_w2l,
          local_w2l: item.local_w2l,
          distrito: item.distrito,
          store: item.store,
          created_at: n,
          direccion: item.direccion
        });
      });

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_diario_18_30-23_59_59-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com',
            port: 465,
            secure: true,
            auth: {
                user: 'webmaster@cotizadorderco.com',
                pass: '...seasons'
            }
        });

        let mailOptions = {
            from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
            to: 'luisa.seminario@geometry.com,daniela.goachet@geometry.com,luisaseminarioB@gmail.com',
            subject: 'Reporte Diario - Día ' + diasSemana[y_day.getDay()] + ", " + y_day.getDate() + " de " + meses[y_day.getMonth()] + " del " + y_day.getFullYear() + ' [18:30h - 23:29:59h] ✔',
            text: 'Reporte diario correspondiente al ' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '. Horas: 18:30h - 23:59:59h',
            html: 'Reporte diario correspondiente al <strong>' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '</strong>. Horas: <strong>18:30h - 23:59:59h</strong>',
            attachments: [
              {   
                  filename: fileTitle + '.csv',
                  path: './dist/' + fileTitle + '.csv'
              },
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
  })
})

router.get('/:brand/2', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(t_day.getFullYear() + '-' + tmonth + '-' + tday + ' 00:00:00'), $lt: new Date(t_day.getFullYear() + '-' + tmonth + '-' + tday + ' 08:00:00') }}, function (err, clients) {
    if (err) return next(err)
    console.log(t_day.getDay(), diasSemana[t_day.getDay()] + ", " + t_day.getDate() + " de " + meses[t_day.getMonth()] + " del " + t_day.getFullYear())
      var itemsNotFormatted = clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
            first_name: item.first_name.replace(/,/g, ''),
            last_name: item.last_name.replace(/,/g, ''),
            brand_w2l: item.brand_w2l,
            rut_w2l: item.rut_w2l,
            email: item.email,
            model_w2l: item.model_w2l,
            fone1_w2l: item.fone1_w2l,
            local_w2l: item.local_w2l,
            distrito: item.distrito,
            store: item.store,
            created_at: n,
            direccion: item.direccion
        })
      })

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_diario_00_00-08_00-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com',
            port: 465,
            secure: true,
            auth: {
                user: 'webmaster@cotizadorderco.com',
                pass: '...seasons'
            }
        })

        let mailOptions = {
            from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
            to: 'luisa.seminario@geometry.com,daniela.goachet@geometry.com,luisaseminarioB@gmail.com',
            subject: 'Reporte Diario - Día ' + diasSemana[t_day.getDay()] + ", " + t_day.getDate() + " de " + meses[t_day.getMonth()] + " del " + t_day.getFullYear() + ' [00:00h - 08:00h] ✔',
            text: 'Reporte diario correspondiente al ' + t_day.getFullYear() + '-' + tmonth + '-' + tday + '. Horas: 00:00h - 08:00h',
            html: 'Reporte diario correspondiente al <strong>' + t_day.getFullYear() + '-' + tmonth + '-' + tday + '</strong>. Horas: <strong>00:00h - 08:00h</strong>',
            attachments: [
              {
                  filename: fileTitle + '.csv',
                  path: './dist/' + fileTitle + '.csv'
              },
          ]
        }

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }

          console.log('Message sent: %s', info.messageId);
          
          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
  })
})

router.get('/:brand/3/:distrito', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, distrito: req.params.distrito, created_at: { $gte: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 00:00:00'), $lt: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 23:59:59') }}, function (err, clients) {
    if (err) return next(err)
      var itemsNotFormatted = clients
      var itemsFormatted = [];
      var emails = ''
      if(req.params.distrito=='SURCO-III' || req.params.distrito=='SAN-JUAN-DE-MIRAFLORES'){
        emails = 'luisa.seminario@geometry.com,daniela.goachet@geometry.com,luisaseminarioB@gmail.com'
      } else if(req.params.distrito=='LA-MOLINA'){
        emails = 'maquinariasveh1@maquinariasprom.pe'
      }

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
            first_name: item.first_name.replace(/,/g, ''),
            last_name: item.last_name.replace(/,/g, ''),
            brand_w2l: item.brand_w2l,
            rut_w2l: item.rut_w2l,
            email: item.email,
            model_w2l: item.model_w2l,
            fone1_w2l: item.fone1_w2l,
            local_w2l: item.local_w2l,
            distrito: item.distrito,
            store: item.store,
            created_at: n,
            direccion: item.direccion
        });
      });

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_diario_00_00-23_59_59-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {

        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.com',
            port: 465,
            secure: true,
            auth: {
                user: 'webmaster@cotizadorderco.com',
                pass: '...seasons'
            }
        });
        
        let mailOptions = {
            from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
            to: emails,
            subject: 'Reporte Diario - Día ' + diasSemana[y_day.getDay()] + ", " + y_day.getDate() + " de " + meses[y_day.getMonth()] + " del " + y_day.getFullYear() + ' [00:00h - 23:29:59h] ✔',
            text: 'Reporte diario correspondiente al ' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '. Horas: 00:00h - 23:59:59h',
            html: 'Reporte diario correspondiente al <strong>' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '</strong>. Horas: <strong>00:00h - 23:59:59h</strong>',
            attachments: [
              {
                  filename: fileTitle + '.csv',
                  path: './dist/' + fileTitle + '.csv'
              },
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }

          console.log('Message sent: %s', info.messageId);
          
          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
  })
})

router.get('/:brand/4', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 00:00:00'), $lt: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 16:00:00') }}, function (err, clients) {
    if (err) return next(err)
      var itemsNotFormatted = clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''),
          last_name: item.last_name.replace(/,/g, ''),
          brand_w2l: item.brand_w2l,
          rut_w2l: item.rut_w2l,
          email: item.email,
          model_w2l: item.model_w2l,
          fone1_w2l: item.fone1_w2l,
          local_w2l: item.local_w2l,
          distrito: item.distrito,
          store: item.store,
          created_at: n,
          direccion: item.direccion
        });
      });

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_domingo_00_00-16_00-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
          host: 'smtp.yandex.com',
          port: 465,
          secure: true,
          auth: {
            user: 'webmaster@cotizadorderco.com',
            pass: '...seasons'
          }
        });

        let mailOptions = {
          from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
          to: 'luisa.seminario@geometry.com,daniela.goachet@geometry.com,luisaseminarioB@gmail.com',
          bcc: 'jmondragonc@gmail.com, armando@likeseasons.com',
          subject: 'Reporte del domingo - Día ' + diasSemana[y_day.getDay()] + ", " + y_day.getDate() + " de " + meses[y_day.getMonth()] + " del " + y_day.getFullYear() + ' [18:30h - 23:29:59h] ✔',
          text: 'Reporte del domingo correspondiente al ' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '. Horas: 00:00h - 16:00h',
          html: 'Reporte del domingo correspondiente al <strong>' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '</strong>. Horas: <strong>00:00h - 16:00h</strong>',
          attachments: [
            {   
              filename: fileTitle + '.csv',
              path: './dist/' + fileTitle + '.csv'
            },
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
  })
})

router.get('/:brand/5', function(req, res) {
  Client.find({ brand_w2l: req.params.brand, created_at: { $gte: new Date(w_day.getFullYear() + '-' + wmonth + '-' + wday + ' 00:00:00'), $lt: new Date(y_day.getFullYear() + '-' + ymonth + '-' + yday + ' 23:59:59') }}, function (err, clients) {
    if (err) return next(err)
      var itemsNotFormatted = clients
      var itemsFormatted = [];

      itemsNotFormatted.forEach((item) => {
        var d = new Date(item.created_at);
        var n = d.toLocaleString('es-PE');
        itemsFormatted.push({
          first_name: item.first_name.replace(/,/g, ''),
          last_name: item.last_name.replace(/,/g, ''),
          brand_w2l: item.brand_w2l,
          rut_w2l: item.rut_w2l,
          email: item.email,
          model_w2l: item.model_w2l,
          fone1_w2l: item.fone1_w2l,
          local_w2l: item.local_w2l,
          distrito: item.distrito,
          store: item.store,
          created_at: n,
          direccion: item.direccion
        });
      });

      var currentDate = new Date()
      var day = currentDate.getDate()
      var month = currentDate.getMonth() + 1
      var year = currentDate.getFullYear()
      var hour = currentDate.getHours();
      var min = currentDate.getMinutes();
      var sec = currentDate.getSeconds();
      var fileTitle = 'reporte_semanal_consolidado-'+ req.params.brand + '_' + year+'-'+month+'-'+day+'__'+hour+'-'+min+'-'+sec;

      exportCSVFile(headers, itemsFormatted, fileTitle)

      nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
          host: 'smtp.yandex.com',
          port: 465,
          secure: true,
          auth: {
            user: 'webmaster@cotizadorderco.com',
            pass: '...seasons'
          }
        });

        let mailOptions = {
          from: '"Cotizador Derco" <webmaster@cotizadorderco.com>',
          to: 'luisa.seminario@geometry.com,daniela.goachet@geometry.com,luisaseminarioB@gmail.com',
          bcc: 'jmondragonc@gmail.com, armando@likeseasons.com',
          subject: 'Reporte semanal - consolidado ✔',
          text: 'Reporte semanal correspondiente del ' + w_day.getFullYear() + '-' + wmonth + '-' + wday + ' hasta el ' + y_day.getFullYear() + '-' + ymonth + '-' + yday,
          html: 'Reporte semanal correspondiente al <strong>' + w_day.getFullYear() + '-' + wmonth + '-' + wday + '</strong> hasta el <strong>' + y_day.getFullYear() + '-' + ymonth + '-' + yday + '</strong>',
          attachments: [
            {   
              filename: fileTitle + '.csv',
              path: './dist/' + fileTitle + '.csv'
            },
          ]
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);

          fs.unlink('./dist/' + fileTitle + '.csv', function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
          });  
        });
      })
    res.json({success: true})
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
