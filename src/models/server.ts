import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/user';
import errorMiddleware from '../middlewares/errorHandler';
// import http from 'http';
// import * as pkg from '../../package.json'

class Server {
  private app: Application;
  private port: String;
  private apiPaths = {
    users: '/users'
  }

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    // Http server
    // this.server = http.createServer( this.app ); --- ES NECESARIO? 
    
    this.middlewares();
    this.routes();
    // this.app.set('pkg', pkg);
  }

  middlewares() {
    this.app.use(cors()); 
    this.app.use(express.json());
    this.app.use(errorMiddleware)
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use(this.apiPaths.users, userRoutes)
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en puerto ${this.port}`);
    })
  }
};

export default Server;