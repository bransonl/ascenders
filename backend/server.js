const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const userRoutes = require('./user/user.route.js').routes;
userRoutes(app);

app.listen(port);
console.log('hello celine');
