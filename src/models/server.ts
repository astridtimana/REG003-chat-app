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
    chat: '/chat'
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
    this.app.use(cors()); 
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(errorMiddleware);
    this.app.use(cookieParser())
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