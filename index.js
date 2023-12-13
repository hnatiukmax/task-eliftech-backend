const express = require('express');
// const hotController = require('./controllers/hotdogcontroller');
var bodyParser = require('body-parser');

const path = require('path');

const { PORT } = process.env

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log(__dirname)

// app.use('/.well-known', express.static(__dirname + '/public'));

// Serve static files with specified content types
app.use('/.well-known', express.static(path.join(__dirname, '/public'), {
    setHeaders: (res, path) => {
        // Set content type based on file extension
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'text/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
        };

        res.setHeader('Content-Type', 'application/json');
    },
}));

app.get('/', (req, res, next) => res.json({ text: 'hello world! Time => ' + Date() }))
// app.get('/hotdogs', hotController.all);
// app.post('/hotdogs', hotController.create);
// app.post('/hotdogs/edit', hotController.update);
// app.post('/hotdogs/delete', hotController.delete);

app.listen(
    3000,
    () => console.log(`Application started at :${PORT}`)
);
