//import Express from 'express';
const Express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = Express();
const port = 3000;

app.use(Express.static('client'));
app.use(bodyParser.urlencoded({
  extended: true,
})); //all the routing will go through this now
app.use(bodyParser.json());

/*
client-server app that converts json to csv

The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `children`.

the client must be able to submit json data to the server, and the server renders that into csv, and sends it back to the client

can use jquery on client, can use bodyparser for express middleware

at this point, it seems like i have a index.html that contains a button and a form.
they enter JSON into the form, they hit submit, submit does some type of native POST from there i guess it should hit the /generate post? which should json.parse/bodyparser and then this should give us back some type of CSV value?

*/


app.get('/', (req, res) => {
  console.log('hello2');
  res.statusCode = 200;
  res.end('test /');
});

app.post('/generate', (req, res) => {
  console.log('post /generate');
  //res.sendFile() perhaps this is the move
  console.log('hello');
  res.statusCode = 200;
  console.log(req.body);
  req.body = JSON.stringify(req.body);
  res.end(req.body);
});



app.listen(port, () => console.log('listening on port:' + port));