const express = require('express')
const bodyParser = require('body-parser');
const items = require('./controller/items');
const schemas = require('./controller/schemas');
const provision = require('./controller/provision');
const { wrapError, errorMiddleware } = require('./utils/errorMiddleware')
const authMiddleware = require('./utils/authMiddleware')

const app = express()
const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(authMiddleware)

app.use(function (req, res, next) {
  req.body.requestContext.settings.secretKey="*******";
  // console.log(req.body);
  next();
}); 

app.post('/schemas/find', wrapError(schemas.findSchemas))
app.post('/schemas/list', wrapError(schemas.listSchemas))
app.post('/data/find', wrapError(items.findItems))
app.post('/data/get', wrapError(items.getItem))
app.post('/data/insert', wrapError(items.insertItem))
app.post('/data/update', wrapError(items.updateItem))
app.post('/data/remove', wrapError(items.removeItem))
app.post('/data/count', wrapError(items.countItems))
app.post('/provision', wrapError(provision.provision))

app.use(errorMiddleware)

app.listen(
  port, 
  () => console.log(`Firestore connector listening on port ${port}!`))
