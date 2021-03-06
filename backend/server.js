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
const Socket = require('./socket');
new Socket(http);

// Set up routes
require('./user/user.route').routes(app);
require('./ticket/ticket.route').routes(app);
require('./label/label.route').routes(app);
require('./message/message.route').routes(app);
require('./notification/notification.route').routes(app);
require('./user-preference/user-preference.route').routes(app);

// Serve frontend
app.use('/admin', express.static(path.join(__dirname, '../frontend/Admin/public')));
app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/Admin/public/index.html'));
});
app.use('/user', express.static(path.join(__dirname, '../frontend/User/public')));
app.get('/user/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/User/public/index.html'));
});

//app.get('*', (req, res) => res.redirect('/user'));

http.listen(port);
console.log('hello branson');
