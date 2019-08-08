const express = require('express');
const hotController = require('./controllers/hotdogcontroller');
var bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/hotdogs', hotController.all);
app.post('/hotdogs', hotController.create);
app.put('/hotdogs/:id', hotController.update);
app.delete('/hotdogs/:id', hotController.delete);

app.listen(
    3000,
    () => console.log("Server is started")
);

//get all the employees
app.get('/employees/:id', (request, response) => {
    mysqlConnection.query('SELECT * FROM employee WHERE empId = ?',request.params.id,
        (error, rows, fields) => {
        if (!error) {
            response.send(rows);
            console.log(rows);
        } else {
            response.send(error);
            console.log(error);
        }
        });
});