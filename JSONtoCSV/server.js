//import Express from 'express';
const Express = require('express');
const fs = require('fs');
const path = require('path');

const bodyParser = require('body-parser');


const app = Express();
const port = 3000;

app.use(Express.static('client'));

app.use(bodyParser.urlencoded({
  extended: false,
})); //all the routing will go through this now
app.use(bodyParser.json()); //i can manually put this middleware in the post





/*
helper function zone, middleware?
*/


const generateCSV = function(data) {
  let data1 = JSON.parse(data.text);
  const dataKeysArray = Object.keys(data1);
  console.log(data1, dataKeysArray);
  const generateColumns = function(data) {
    //data is going to be req.body, maybe req.body.json2csv unsure, which is currently a object for us
    //console.log(data); //pure object

    let dataColumnNames = '';
    //firstName,lastName,county,city,role,sales
    for (var i = 0; i < dataKeysArray.length - 1; i++) {
      dataColumnNames += dataKeysArray[i] + ',';
    }
    dataColumnNames += '\n';
    return dataColumnNames;

  };
  let dataColumns = generateColumns(data1);

  const generateCSVInfo = function(data) {
    let csvInfo = '';

    for (var i = 0; i < dataKeysArray.length; i++) {

      if (dataKeysArray[i] !== 'children' && dataKeysArray[i] !== 'sales') {
        csvInfo += data[dataKeysArray[i]] + ',';
      } else if (dataKeysArray[i] === 'sales') {
        csvInfo += data[dataKeysArray[i]] + '<br>';
      } else if (dataKeysArray[i] === 'children' && data.children.length > 0) {
        for (var x = 0; x < data.children.length; x++) {
          csvInfo += generateCSVInfo(data.children[x]);
        }
      }
    }
    return csvInfo.slice();
  };
  const csvInfo = generateCSVInfo(data1);
  //console.log('csvInfo', csvInfo);
  const form = `
  <form method="POST" action="http://localhost:3000/" id="form1">
    <textarea form="form1" type="text" name="json2csv" rows="5" cols="50"></textarea>
    <input type="submit" value="submit">
  </form><br><p>`;

  return form + dataColumns + csvInfo + '</p>';


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
  res.render('index');
});

//json2csv textarea name

app.post('/', (req, res) => {
  console.log('post /');

  //console.log(req.body.json2csv);
  //req.body = JSON.stringify(req.body); not necessary to stringify, function will parse

  //console.log(req.body);
  const jsonInfo = req.body;
  console.log(typeof req.body);
  let csvInfo = generateCSV(req.body);
  //console.log('csvinfo', csvInfo);
  //here we must turn req.body into csv req.body and then send it in end
  //res.header('Content-Type', 'text/csv');
  //res.header('Location', 'http://www.yoursite.com/home-page.html');
  /*res.format({
    html: function() {
      res.send(csvInfo);
    }
  });*/

  res.send(csvInfo);
});



app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('listening on port:' + port);
});