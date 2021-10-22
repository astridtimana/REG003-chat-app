import dotenv from 'dotenv';
import Server from './models/server';

// Configurar dotenv
dotenv.config();

// Inicializando servidor
export const server = new Server();

server.execute();
