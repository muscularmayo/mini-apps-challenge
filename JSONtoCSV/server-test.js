const request = require('request');
//request is deprecated? dunno what to do
describe('Server', function() {
  test('should respond with "test /generate', function(done) {
    const options = {
      uri: 'http://localhost:3000/generate',
      method: 'GET'
    };
    request(options, function (err, res) {
      if (err) {
        return err;
      }
      expect(res.statusCode).to.be(200);

    });

  });
});
// test not working, fix later

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