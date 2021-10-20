import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import chatRoutes from '../routes/chat';
import errorMiddleware from '../middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// import * as pkg from '../../package.json'

class Server {
  public app: Application;
  public port: String;
  public apiPaths = {
    users: '/users',
    auth: '/auth',
    chat: '/chat',
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';
    
    this.middlewares();
    this.routes();
    // this.app.set('pkg', pkg);
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
    this.app.use(this.apiPaths.users, userRoutes)
    this.app.use(this.apiPaths.auth, authRoutes)
    this.app.use(this.apiPaths.chat, chatRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    })
  }
};

export default Server;