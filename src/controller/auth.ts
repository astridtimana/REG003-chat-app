import prisma from "../db/client";
import { Request, Response, NextFunction } from "express";
import HttpException from "../helpers/httpException";
import bcrypt from 'bcryptjs';
import { generateToken } from "../helpers/generateToken";

const login = async (req: Request, res: Response, next: NextFunction) =>{

    const {email,password} =req.body;
    try {
        
        //Verificar si existe el correo
        const existingUser:any = await prisma.user.findUnique({
            where: {
              email: email
            },
          })
        
        if(!existingUser){ res.status(404).json('Usuario no encontrado')}
        
        //Verificar el password
        const validPassword = bcrypt.compareSync(password, existingUser.password)
        if(!validPassword) { return  res.status(400).json('Password no es correcta') }

        const token = await generateToken(existingUser.id);

        res.json({email:existingUser.email , name:existingUser.name , id:existingUser.id , token})
        
    } catch (error:any) {
        next(new HttpException(error.status, error.message))
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) =>{

    const {email,password} =req.body;
    try {
        

        


    } catch (error:any) {
        next(new HttpException(error.status, error.message))
    }
}

export {login,logout}