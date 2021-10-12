import { Request, Response, NextFunction } from "express";
import HttpException from "../helpers/httpException";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createUser = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    })

    if (existingUser) { return next(new HttpException(400, 'Bad request')) }

    const user = await prisma.user.create({ data: req.body });
    res.json(user)

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
  console.log(req.params)
  try {

    // By ID
    const findUserId = await prisma.user.findUnique({
      where: {
        id: parseInt(req.params.uid),
      },
    })

    if (findUserId ) {
      res.json(findUserId)
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