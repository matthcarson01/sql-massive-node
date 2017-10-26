const express = require('express'),
     bodyParser = require('body-parser'),
     cors = require('cors'),
     massive = require('massive'),
     products_controller = require('./products_controller');
require('dotenv').config();//Why do we require this different?

const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
.then(dbInstance => app.set('db',dbInstance))
.catch(console.log);
app.get('/api/products', products_controller.getAll );
app.get('/api/product/:id',products_controller.getOne);
app.put('/api/product/:id?desc=...',products_controller.update);
app.post('/api/product', products_controller.create);
app.delete('/api/product/:id', products_controller.delete);



app.listen(port,()=>{console.log(`Listening on ${port}`)});