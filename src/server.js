'use strict';

const express = require('express');
const bodyParser = require( "body-parser" );
const config = require( "./config" );

const app = express();
const PORT = config.port;
const HOST = config.host;

app.use( bodyParser.json( ) );
require( "./config/mongoose" )( app );
require( "./app" )( app );

// App
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Expre hewufheu ss' });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
