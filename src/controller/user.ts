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
        error: 'El usuario ya existe en la base de datos'
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
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token
    })

  } catch (error: any) {
    res.status(error.status).json(error.message)
  }
}



const getUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
    // Cómo podemos hacer para que aquí no se muestre la contraseña? Tal vez en el modelo idk
  } catch (error: any) {
    res.status(error.status).json(error.message)
  }

}



const getUser = async (req: Request, res: Response) => {
  try {
    const findUserId = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.uid),
      },
    })

    if (!findUserId ) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      })
    }

    res.json({
      id: findUserId.id,
      name: findUserId.name,
      email: findUserId.email,
    })

  } catch (error: any) {
    res.status(error.status).json(error.message)
  }
}



const updateUser = async (req: Request, res: Response) => {
  try {

    let { name, email, password } = req.body

    const findUserToUpd = await prisma.user.findUnique({
      where: {
        id: Number(req.params.uid),
      }
    })

    if (!findUserToUpd) return res.status(404).json({
      error: 'Usuario no encontrado'
    })

    if (password) {
      const salt = bcrypt.genSaltSync();
      password = bcrypt.hashSync(password , salt);
    } 

    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.uid),
      },
      data: { email, name, password }
    });

    return res.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email
    })
    
  } catch (error: any) {
    res.status(error.status).json(error.message)
  }
}



const deleteUser = async (req: Request, res: Response) => {
  try {

    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(req.params.uid),
      },
    })
    return res.json({
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email
    })
  } catch (error: any) {
    res.status(error.status).json(error.message)
  }
}

export { createUser, getUsers, getUser, updateUser, deleteUser }