const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// Set up socket
new (require('./socket'))(http);

// Set up routes
require('./user/user.route.js').routes(app);
require('./ticket/ticket.route.js').routes(app);
require('./label/label.route.js').routes(app);
require('./message/message.route.js').routes(app);
require('./notification/notification.route').routes(app);

// Serve frontend
app.use('/admin', express.static(path.join(__dirname, '../frontend/Admin/public')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/Admin/public/index.html'));
});

app.listen(port);
console.log('hello branson');
