//import Express from 'express';
var Express = require('express');
const app = Express();
const port = 3000;
/*
The server must flatten the JSON hierarchy, mapping each item/object in the JSON to a single line of CSV report (see included sample output), where the keys of the JSON objects will be the columns of the CSV report.
You may assume the JSON data has a regular structure and hierarchy (see included sample file). In other words, all sibling records at a particular level of the hierarchy will have the same set of properties, but child objects might not contain the same properties. In all cases, every property you encounter must be present in the final CSV output.
You may also assume that child records in the JSON will always be in a property called `children`.

*/


app.get('/', (req, res) => {
  console.log('hello2');
  res.send('test2');
});

app.listen(port, () => console.log('listening on port:' + port));