const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const userRoutes = require('./user/user.route.js').routes;
const ticketRoutes = require('./ticket/ticket.route.js').routes;
userRoutes(app);
ticketRoutes(app);

app.listen(port);
console.log('hello branson');
