"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUid_1 = require("../helpers/getUid");
class Sockets {
    constructor(io) {
        this.io = io;
        this.socketEvents();
    }
    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {
            const uid = (0, getUid_1.getUid)(socket.handshake.query['x-token']);
            //console.log(uid)
            //console.log(socket.handshake.query)
            console.log('Cliente conectado');
            // Escuchar evento: mensaje-to-server
            /* socket.on('connected', ( ) => {
                console.log( 'Cliente conectado' );
            
                // this.io.emit('mensaje-from-server', data );
            }); */
            // TODO: Validar el JWT
            // Si el token no es válido, desconectar
            // TODO: Saber qué usuario está activo mediante UID
            // TODO: Emitir usuarios conectados
            // TODO: Socket join (unirlos a una sala en particular)
            socket.join(uid);
            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal
            socket.on('mensaje-personal', (payload) => {
                console.log(payload);
            });
            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconectó
            socket.on('disconnect', ( /*data:any*/) => {
                console.log('Cliente desconectado');
                // this.io.emit('mensaje-from-server', data );
            });
            // TODO: Emitir todos los usuarios conectados
        });
    }
}
module.exports = Sockets;
//# sourceMappingURL=sockets.js.map