
import Jwt from "jsonwebtoken"
import { NextFunction, Response, Request } from "express"

// Authentication
export const isAuthentic = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await req.headers.authorization
        if (!token) return res.status(404).json({
            status: false,
            errors: { message: "Token not found" }
        })

        /* decode token */
        const splitToken = await req.headers.authorization?.split(' ')[1]
        const decode: any = await Jwt.verify(`${splitToken}`, `${process.env.JWT_SECRET}`)

        req.user = {
            id: decode.id,
            name: decode.name
        }

        next()
    } catch (error: any) {
        if (error) {
            if (error?.name === 'TokenExpiredError') {
                return res.status(410).json({
                    status: false,
                    errors: { message: "Token expired" }
                })
            }
            return res.status(501).json({
                status: false,
                errors: { message: "Unauthorized request" }
            })
        }
    }
}