import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import chatRoutes from '../routes/chat';
import errorMiddleware from '../middlewares/errorHandler';
import cookieParser from 'cookie-parser';
import { Server  as SocketServer  } from "socket.io";

class Server {
  public app: Application;
  public port: String;
  public server: any;
  public listen: any;
  public io: any;
  public apiPaths = {
    auth: '/',
    users: '/users',
    chat: '/chat',
  }
  


  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.server = http.createServer(this.app);
    
    this.app.set("trust proxy", 1); // es necesario?
    
    // Configuraciones de sockets
    this.io = new SocketServer( this.server);

  }

  middlewares() {
    this.app.use(cors( { // dejamos todo este objeto por axios que lo necesita
      origin: process.env.CLIENT_URL || "http://localhost:3000", // luego seteamos la url de nuestro proyecto
      credentials:true,
      preflightContinue:true,
    } )); 
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(errorMiddleware);
  }
  
  routes() {
    this.app.use(this.apiPaths.auth, authRoutes)
    this.app.use(this.apiPaths.users, userRoutes)
    this.app.use(this.apiPaths.chat, chatRoutes)
  }

  execute() {

    // Inicializar Middlewares
    this.middlewares();
    this.routes();

    // Inicializar sockets
    //this.configurarSockets();

    // Inicializar Server
    this.server.listen( this.port, () => {
      console.log('Server corriendo en puerto', this.port );
    });
  }

  // listen() {
  //   this.app.listen(this.port, () => {
  //     console.log(`Servidor corriendo en puerto ${this.port}`);
  //   })
  // }
};

export default Server;