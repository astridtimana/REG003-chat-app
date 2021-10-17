import { Request, Response, NextFunction } from "express";
import HttpException from "../helpers/httpException";
import prisma from "../db/client";
import bcrypt from 'bcryptjs';
import { generateToken } from "../helpers/generateToken";



const createUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (existingUser) { return next(new HttpException(400, 'Bad request')) }

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
    return res.redirect('/')
    // res.json({email:user.email , name:user.name , id:user.id , token})

  } catch (error: any) {
    next(new HttpException(error.status, error.message))
  }
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const allUsers = await prisma.user.findMany();
    res.json(allUsers)

  } catch (error: any) {
    next(new HttpException(error.status, error.message))
  }

}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // By ID
    const findUserId = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.uid),
      },
    })
    // console.log(findUserId)

    if (!findUserId ) {
       return res.status(404).json('Usuario no encontrado')
     }
    
    // deberíamos hacer un findUser by email?
    // else /* if (!findUserId) */{
    //   // By unique identifier
    //   const findUserEmail = await prisma.user.findUnique({
    //     where: {
    //       email: req.params.uid,
    //     },
    //   })

    //   res.json(findUserEmail)
    // }
    res.json(findUserId)
  } catch (error: any) {
    next(new HttpException(error.status, error.message))
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: Number(req.params.uid),
      },
      data: {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password
      },
    })
    res.json(updatedUser)
  } catch (error: any) {
    next(new HttpException(error.status, error.message))
  }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const deleteUser = await prisma.user.delete({
      where: {
        id: Number(req.params.uid),
      },
    })
    res.json(deleteUser)
  } catch (error: any) {
    next(new HttpException(error.status, error.message))
  }
}

export { createUser, getUsers, getUser, updateUser, deleteUser }