import { Request, Response, NextFunction} from "express";
import HttpException from "../helpers/httpException";

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .setHeader('Content-Type', 'application/json')
        .status(status)
        .send({
            status,
            message,
        })
  }
   
  export default errorMiddleware;