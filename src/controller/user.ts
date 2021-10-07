import { Request, Response } from "express"

const createUser = async (req: Request, res: Response) => {
  res.json({
    ok: 'funcionó post'
  })
}

const getUsers = async (req: Request, res: Response) => {
  res.json({
    ok: 'funcionó get userS'
  })
}

const getUser = async (req: Request, res: Response) => {
  res.json({
    ok: 'funcionó get user'
  })
}

const updateUser = async (req: Request, res: Response) => {
  res.json({
    ok: 'funcionó put'
  })
}

const deleteUser = async (req: Request, res: Response) => {
  res.json({
    ok: 'funcionó delete'
  })
}

export { createUser, getUsers, getUser, updateUser, deleteUser }