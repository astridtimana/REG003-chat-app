import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import authRoutes from '../routes/auth';
import chatRoutes from '../routes/chat';
import currentUserRoutes from '../routes/currentUser'
import errorMiddleware from '../middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// import * as pkg from '../../package.json'

class Server {
  public app: Application;
  public port: String;
  public apiPaths = {
    auth: '/',
    users: '/users',
    chat: '/chat',
    currentUser:'/currentUser'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    // Http server
    // this.server = http.createServer( this.app ); -- es necesario?
    
    this.middlewares();
    this.routes();
    // this.app.set('pkg', pkg);
  }

  middlewares() {
    this.app.use(cors({
      origin:"http://localhost:3000",
      credentials:true,
      preflightContinue:true,
    })); 
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(errorMiddleware);
  }

  routes() {
    this.app.use(this.apiPaths.auth, authRoutes)
    this.app.use(this.apiPaths.users, userRoutes)
    this.app.use(this.apiPaths.chat, chatRoutes)
    this.app.use(this.apiPaths.currentUser, currentUserRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    })
  }
};

export default Server;