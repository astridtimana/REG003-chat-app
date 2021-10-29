import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    try {
      // console.log(req.cookies)
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        msg: 'No hay token en la petición'
      })
    }

    // Verifica si el token coincide con alguno generado y que
    // tiene la signature que está en el archivo .env
    if (process.env.JWT_KEY) {
      const { uid }:any = jwt.verify(token, process.env.JWT_KEY);
      req.uid = uid

    } else {
      res.status(403).json({
        msg: 'No está autorizado'
      })
    }
    
    next()

  } catch (err) {
    return res.clearCookie("token");
    // return res.status(401).json({
    //   msg: 'Token no es válido'
    // })
  }
}
