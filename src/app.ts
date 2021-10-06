import dotenv from 'dotenv';
import Server from './models/server';

// Configurar dotenv
dotenv.config();

// Inicializando servidor
const server = new Server();

server.listen();
