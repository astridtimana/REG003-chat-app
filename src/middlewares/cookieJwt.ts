import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

exports.cookieJwtAuth = (req:Request, res:Response, next:NextFunction) => {
  const token = req.cookies.token;
  try {
    
    const jwtSecret:any= process.env.JWT_KEY

    if(jwtSecret){
        const user = jwt.verify(token, jwtSecret);
        req.user = user
        console.log(user)
    }
    

  } catch (err) {
    res.clearCookie("token");
    return res.redirect("/");
  }
};