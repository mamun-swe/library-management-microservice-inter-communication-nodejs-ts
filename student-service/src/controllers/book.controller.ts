
import { Request, Response, NextFunction } from "express"
import { publishToQueue } from "../services/rabbitmq.service"

/* List of items */
export const Index = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let { queueName, payload } = req.body
        
        await publishToQueue(queueName, payload)

        res.status(200).json({
            status: true,
            data: []
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Show specific item */
export const Show = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.status(200).json({
            status: true,
            data: null
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}