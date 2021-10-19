import { Request, Response } from "express";
import prisma from "../db/client";
import bcrypt from 'bcryptjs';
import { generateToken } from "../helpers/generateToken";


const createUser = async (req: Request, res: Response) => {

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (existingUser) {
      return res.status(400).json({
        error: 'Email already exists'
      })
    }

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(req.body.password , salt);

    const newUser= {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }
    
    const user = await prisma.user.create({ data: newUser });

    const token = await generateToken(user.id);
    
    res.cookie("token", token);
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token
    })

  } catch (error: any) {
    res.status(500).json('Internal server error');
  }
}



const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers)
    // Cómo podemos hacer para que aquí no se muestre la contraseña? Tal vez en el modelo idk
  } catch (error: any) {
    // No sabemos qué error podemos darle para testearlo
    res.status(500).json('Internal server error');
  }
}



const getUser = async (req: Request, res: Response) => {
  
  try {
    const { uid } = req.params;
  
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
    return res.status(404).json({
      error: 'User not found'
    });
    
  }
}



const updateUser = async (req: Request, res: Response) => {
  
  let { name, email, password } = req.body
  const { uid } = req.params
  
  try {
    
    if (!uid || (!name && !email && !password)) {
      return res.status(400).json({
        error: 'Bad request'
      })
    }
    
    if (password) {
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password , salt);
    } 
    
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(uid),
      },
      data: { email, name, password }
    });

    return res.status(200).json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    })
    
  } catch (error: any) {

    if (error.code === 'P2025') {
      return res.status(404).json({
        error: 'User not found'
      })
    } else {
      return res.status(500).json({
        error: 'Internal server error'
      });
    }
  }
}



const deleteUser = async (req: Request, res: Response) => {
  try {

    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.uid),
      },
    })
    return res.status(200).json({
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email
    })
  } catch (error: any) {
    res.status(400).json('Bad request');
  }
}

export { createUser, getUsers, getUser, updateUser, deleteUser }