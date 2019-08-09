const express = require('express');
const hotController = require('./controllers/hotdogcontroller');
var bodyParser = require('body-parser');

const { PORT } = process.env

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => res.json({ text: 'hello world!' }))
app.get('/hotdogs', hotController.all);
app.post('/hotdogs', hotController.create);
app.put('/hotdogs/:id', hotController.update);
app.delete('/hotdogs/:id', hotController.delete);

app.listen(
    PORT,
    () => console.log(`Application started at :${PORT}`)
);
