import { Request, Response } from "express";
import prisma from "../db/client";
import jwtDecode from 'jwt-decode';


export const getCurrentUser = async (req: Request, res: Response) => {
  
    try {
        // const token = req.cookies.token;
        // const decodeToken:any = jwtDecode(token);

        const uid = req.uid
    
        const findUserId:any = await prisma.user.findUnique({
            where: {
            id: Number(uid)
            }
        })
      
      return res.status(200).json({
        id: findUserId.id,
        name: findUserId.name,
        email: findUserId.email,
      })
  
      
    } catch (error: any) {
      console.log(error)
      return res.status(404).json({
        error: 'User not found'
      });
      
    }
  }