

class Sockets {

    public io:any;

    constructor( io:any ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket:any ) => {

             // Escuchar evento: mensaje-to-server
             socket.on('connected', ( /*data:any*/ ) => {
                console.log( 'User connected :DDDDD' );
                
                // this.io.emit('mensaje-from-server', data );
            });

            // TODO: Validar el JWT
            // Si el token no es válido, desconectar

            // TODO: Saber qué usuario está activo mediante UID

            // TODO: Emitir usuarios conectados

            // TODO: Socket join (unirlos a una sala en particular)
        
            // TODO: Escuchar cuando el cliente manda un mensaje
            // mensaje-personal

            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconectó

            // TODO: Emitir todos los usuarios conectados
        });
    }


}


module.exports = Sockets
