//import Express from 'express';
const Express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');


const app = Express();
const port = 3000;


app.use(bodyParser.urlencoded({
  extended: true,
})); //all the routing will go through this now
app.use(bodyParser.json()); //i can manually put this middleware in the post
app.use(Express.static('client'));





/*
helper function zone, middleware?
*/


const generateCSV = function(data) {

  const dataKeysArray = Object.keys(data);

  const generateColumns = function(data) {
    //data is going to be req.body, maybe req.body.json2csv unsure, which is currently a object for us
    console.log(data); //pure object

    let dataColumnNames = '';
    //firstName,lastName,county,city,role,sales
    for (var i = 0; i < dataKeysArray.length - 1; i++) {
      dataColumnNames += dataKeysArray[i] + ',';
    }
    dataColumnNames += '\n';
    return dataColumnNames;

  };
  let dataColumns = generateColumns(data);

  const generateCSVInfo = function(data) {
    let csvInfo = '';
    for (var i = 0; i < dataKeysArray.length; i++) {
      let last = dataKeysArray[dataKeysArray.length - 2];
      if (dataKeysArray[i] !== 'children' && dataKeysArray[i] !== last) {
        csvInfo += data[dataKeysArray[i]] + ',';
      } else if (dataKeysArray[i] === last) {
        csvInfo += data[dataKeysArray[i]] + '\n';
      } else if (dataKeysArray[i] === 'children' && data.children.length > 0) {
        for (var x = 0; x < data.children.length; x++) {
          csvInfo += generateCSVInfo(data.children[x]);
        }
      }
    }
    return csvInfo;
  };
  const csvInfo = generateCSVInfo(data);
  //console.log('csvInfo', csvInfo);
  return dataColumns + csvInfo;


};





/*
helper function zone end
*/






/*
server routes
*/
app.get('/', (req, res) => {
  console.log('get /');
  res.statusCode = 200;
  res.end('get /');
});

//json2csv textarea name

app.post('/generate', (req, res) => {
  console.log('post /generate');

  //console.log(req.body.json2csv);
  //req.body = JSON.stringify(req.body); not necessary to stringify, function will parse

  //console.log(req.body);
  const jsonInfo = req.body;

  let csvInfo = generateCSV(req.body);
  console.log('csvinfo', csvInfo);
  //here we must turn req.body into csv req.body and then send it in end
  res.header('Content-Type', 'text/csv');
  res.end(csvInfo);
});



app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('listening on port:' + port);
});