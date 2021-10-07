var express = require('express'),
   app = express(),
   bodyParser = require('body-parser'),
   cors = require('cors'),
   routes = require('./_helpers/routes');

app.use(cors());

app.use(function (req, res, next) {
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, content-type, Accept,x-access-token')
   next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(routes);

app.listen(4000, () => {
   console.log('server running at 4000');
});