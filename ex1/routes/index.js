var express = require('express');
var router = express.Router();
var Mapa = require('../controllers/mapa')


router.get('/api/cidades', function(req, res, next) {
  /* GET /api/cidades?distrito=DDDD 
  Devolve a lista de cidades pertencentes ao distrito DDDD, para cada cidade 
  apresenta os campos: id e nome; */
  if (req.query.distrito){
    Mapa.findByDistrito(req.query.distrito)
      .then(resp => res.status(204).jsonp(resp))
      .catch(e => res.status(504).jsonp({erro: e}))
  }
  /* GET /api/cidades 
  Devolve a lista das cidades, com os campos: id, nome, e distrito */
  else{
    Mapa.list()
    .then(resp => res.status(201).jsonp(resp))
    .catch(e => res.status(501).jsonp({erro: e}))
  }
});

/* GET /api/cidades/:id 
Devolve a informação completa de uma cidade */
router.get('/api/cidades/:id', function(req, res, next) {
  if (req.params.id!='nomes'){
    Mapa.find(req.params.id)
      .then(resp => res.status(202).jsonp(resp))
      .catch(e => res.status(502).jsonp({erro: e}))
  }
  /* GET /api/cidades/nomes
  Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente */
  else{
    Mapa.listNames()
      .then(resp => res.status(203).jsonp(resp))
      .catch(e => res.status(503).jsonp({erro: e}))
  }
});

/* GET /api/distritos
Devolve uma lista de distritos em que para cada distrito apresenta os campos: 
nome do distrito e lista de cidades pertencentes ao distrito 
(apenas id e nome de cada cidade). */
router.get('/api/distritos', function(req, res, next) {
  Mapa.listDistritos()
      .then(resp => res.status(205).jsonp(resp))
      .catch(e => res.status(505).jsonp({erro: e}))
});

router.get('/api/ligacoes', function(req, res, next) {
  /* GET /api/ligacoes?origem=XX
  Devolve a lista de ligações que têm a cidade XX como origem, 
  a lista deverá ter os seguintes campos: 
  id da ligação, id da cidade destino, nome da cidade destino */
  if (req.query.origem){
    Mapa.listLigacoesByOrig(req.query.origem)
    .then(resp => res.status(206).jsonp(resp))
    .catch(e => res.status(506).jsonp({erro: e}))
  }
  /* GET /api/ligacoes?dist=YY
  Devolve a lista de ligações que têm uma distância maior ou igual a YY,
  a lista deverá ter os seguintes campos: id da ligação, 
  id da cidade origem, nome da cidade origem, id da cidade destino 
  e nome da cidade destino.*/
  else if (req.query.dist){
    Mapa.listLigacoesByDist(req.query.dist)
      .then(resp => res.status(207).jsonp(resp))
      .catch(e => res.status(507).jsonp({erro: e}))
  }
});


module.exports = router;
