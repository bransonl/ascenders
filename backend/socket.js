const Server = require('socket.io');

class Socket {
    constructor(http) {
        if (!Socket._socket) {
            console.log('init socket');
            Socket._socket = new Server(http, {
                serverClient: false,
            });
        }
    }

    static get socket() {
        return this._socket;
    }
}

module.exports = Socket;
