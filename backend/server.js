const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

require('./user/user.route.js').routes(app);
require('./ticket/ticket.route.js').routes(app);
require('./message/message.route.js').routes(app);

app.listen(port);
console.log('hello branson');
