const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {graphqlHTTP} = require('express-graphql');

const {schema, root} = require('./src/model/schema');
const db = require('./db');


const Config = require('./config/config');


const app = express()
const port = Config.port;


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

let server = app.listen(port);
app.use(cors());
app.use(bodyParser.json());

app.use('/graphql',  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: {db},
    customFormatErrorFn: (err) => {
        return{ message: err.message}
    }
  }));
  
console.log('Server started on: ' + port);

module.exports = server