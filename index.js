const express = require('express');
// const hotController = require('./controllers/hotdogcontroller');
var bodyParser = require('body-parser');

const { PORT } = process.env

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => res.json({ text: 'hello world! Time => ' + Date() }))
// app.get('/hotdogs', hotController.all);
// app.post('/hotdogs', hotController.create);
// app.post('/hotdogs/edit', hotController.update);
// app.post('/hotdogs/delete', hotController.delete);

app.listen(
    3000,
    () => console.log(`Application started at :${PORT}`)
);
