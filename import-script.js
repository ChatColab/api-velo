//convertion of data.csv to json in json_final variable
//in data.csv, we only take these attributes : x, y, capacite, code_com, gratuit
//exemple of one line : {"data":{"x":2.3488,"y":48.8534,"capacite":5,"code_com":"75056","gratuit":false}}
//we will do this for each line in data.csv

//code :

//open the file
var fs = require('fs');
var file = fs.readFileSync('data.csv', 'utf8');

