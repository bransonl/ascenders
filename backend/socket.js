const Server = require('socket.io');

class Socket {
    constructor(http) {
        if (!Socket._socket) {
            Socket._socket = Server(http);
            console.log('init socket');
        }
    }

    static get socket() {
        return this._socket;
    }
}

module.exports = Socket;
