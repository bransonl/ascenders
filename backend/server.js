let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.listen(port);

let userRoutes = require('./user/user.route.js').routes;
userRoutes(app);

console.log('hello celine');
