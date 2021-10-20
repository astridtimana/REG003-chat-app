import prisma from "../db/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { generateToken } from "../helpers/generateToken";

export const login = async (req: Request, res: Response) =>{

  const {email,password} =req.body;
  try {
    
    if (!email && !password) {
      return res.status(400).json({
        error: 'Bad request'
      })
    }
    
    //Verificar si existe el correo
    const existingUser:any = await prisma.user.findUnique({
      where: {
        email: email
      },
    })
    
    //Verificar el password
    const validPassword = bcrypt.compareSync(password, existingUser.password)
    if(!validPassword) { 
      return res.status(400).json({
        error: 'Wrong password'
      }) 
    }

    const token = await generateToken(existingUser.id);
    
    res.cookie("token", token, { expires: new Date( Date.now() + 1800000) });

    res.status(200).json({email:existingUser.email , name:existingUser.name , id:existingUser.id , token})
      
  } catch (error:any) {
    return res.status(404).json({error: 'User not found'})
  }
}