import { Request, Response } from "express";
import prisma from "../db/client";

export const sendMessages = async (req: Request, res: Response) => {

    try {

        const myId = req.uid;
        const { toId, msg } = req.body;

        const newMessage = {
            userId: Number(myId),
            toId: Number(toId),
            body: msg
        }

        const sendMsg = await prisma.message.create({ data: newMessage})

        res.status(200).json({data: sendMsg})

    } catch (error: any) {
        console.log(error)
        res.status(500).json('Internal server error');
    }
}


export const getMessages = async (req: Request, res: Response) => {
    console.log('holi')
    try {
        console.log('linea28')
        const id = req.params.uid
        const msgFrom = req.params.from

        const last30 = await prisma.message.findMany({
            where: {
                OR: [
                    {   //@ts-ignore
                        from: Number(id),
                        //@ts-ignore
                        to: Number(msgFrom)
                    },
                    {   //@ts-ignore
                        to: Number(id),
                        //@ts-ignore
                        from:Number(msgFrom)
                    },
                ],
            },
            orderBy: [
                {
                    createdAt: 'asc',
                },
            ],
            take:30
        },
        )

        res.status(200).json(last30)

    } catch (error: any) {
        console.log(error)
        res.status(500).json({error:'Internal server error'});
    }
}
