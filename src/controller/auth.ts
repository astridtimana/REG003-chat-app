import prisma from "../db/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { generateToken } from "../helpers/generateToken";

export const login = async (req: Request, res: Response) =>{

  const {email,password} =req.body;
  try {
      
    //Verificar si existe el correo
    const existingUser:any = await prisma.user.findUnique({
      where: {
        email: email
      },
    })
    
    if(!existingUser){ 
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }
    
    //Verificar el password
    const validPassword = bcrypt.compareSync(password, existingUser.password)
    if(!validPassword) { 
      return res.status(400).json({
        error: 'La contraseña no es correcta'
      }) 
    }

    const token = await generateToken(existingUser.id);
    
    res.cookie("token", token);
    res.json({email:existingUser.email , name:existingUser.name , id:existingUser.id , token})
      
  } catch (error:any) {
    res.status(error.status).json(error.message)
  }
}