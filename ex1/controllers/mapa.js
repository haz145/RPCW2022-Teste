var Cidade = require('../models/cidade')
var Ligacao = require('../models/ligacao')

// Devolve a lista das cidades, com os campos: id, nome, e distrito
module.exports.list = function(){
    return Cidade.find({}, '_id nome distrito').exec()
}

//Devolve a informação completa de uma cidade
module.exports.find = function(id){
    return Cidade.findOne({_id: id}).exec()
}

// Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente
module.exports.listNames = function(){
    return Cidade.find({}, 'nome -_id').sort({nome:1}).exec()
}

/* Devolve a lista de cidades pertencentes ao distrito DDDD, 
para cada cidade apresenta os campos: id e nome; */
module.exports.findByDistrito = function(d){
    return Cidade.find({distrito: d}, '_id nome').exec()
}

/*Devolve uma lista de distritos em que para cada distrito apresenta os campos: 
nome do distrito e lista de cidades pertencentes ao distrito 
(apenas id e nome de cada cidade). */
module.exports.listDistritos = function(d){ //TODO
    return Cidade.find({}, 'distrito').exec()
}

/*Devolve a lista de ligações que têm a cidade XX como origem, 
a lista deverá ter os seguintes campos: 
id da ligação, id da cidade destino, nome da cidade destino */
module.exports.listLigacoesByOrig = function(o){ 
    // +nome cidade destino
    return Ligacao.find({origem: o}, '_id destino').exec() 
}

/*Devolve a lista de ligações que têm uma distância maior ou igual a YY,
 a lista deverá ter os seguintes campos: id da ligação, 
 id da cidade origem, nome da cidade origem, id da cidade destino 
 e nome da cidade destino.*/
module.exports.listLigacoesByDist = function(d){ 
    return Ligacao.find({distância: {$gte: d}}, '_id origem destino').exec()
    //Cidade.findOne({_id:e.origem}, 'nome').exec(),
    //Cidade.findOne({_id:ligs.destino}, 'nome').exec()
}