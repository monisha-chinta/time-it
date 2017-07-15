const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');

const port = process.env.PORT || '3001';
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../react-ui/build')));

require('./routes.js')(app);

app.listen(port, function() {
  console.log("Listening on " + port);
});
