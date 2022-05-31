var express = require('express');
var router = express.Router();
var axios = require('axios');

router.get('/', function(req, res, next) {
  res.render('index');
});

var key = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTY1MGVlNmI1ZDVjMjQ3NmNmMTZhOCIsImlhdCI6MTY1NDAxODI4NiwiZXhwIjoxNjU2NjEwMjg2fQ.R04BRndF0rmuCKBIpy520E8YEzP97abz9uYhC0TUcadPGqpE65vrgI95pACiD2X5nVIIftsPpoxyIczGMb9MisXqP3v661v71Z73LqSTqSyPa6Nx2mMkeuM1JTTLN1_wW27EPHGne3DtV6gJHicWVaYxCnAF-JoNA_vT7Dp9RU5a2NA6JCEWAHxDluVb8M1t7_wRoNVT57xSWSwR2Khl8tt4DYzJFk5L4i6RtpLwS8dgxwKp8DmDV5SKF-0z-GPKr5l69uzbP4KnLBZAzyGNzEgLQVBECF-mlCuHPdDweyQq3BZV3m9_8PGtxHSzLcT5Bl3n6X3NoA8YI0BKg9PJpg'

router.get('/classes', function(req, res, next) {
  let qstring = {
    apikey: encodeURIComponent(key),
    nivel: 1
  }
  axios.get("http://clav-api.di.uminho.pt/v2/classes", { params: qstring })
  .then( resp => {
    res.render('classes', { n: 1, data: resp.data });
  })
  .catch(function(erro){
    res.render('error', { error: erro })
  })
});


router.get(/\/classes\/.+/, function(req,res,next) {
  let code = req.url.split('/')[2]
  let qstring = { 
    apikey: encodeURIComponent(key) 
  }
  axios.get("http://clav-api.di.uminho.pt/v2/classes/" + code, { params: qstring })
  .then( resp => {
    res.render('class', {data: resp.data});
  })
  .catch(function(erro){
    res.render('error', { error: erro })
  })
});

router.get('/termos', function(req, res, next) {
  res.render('index');
});

module.exports = router;
