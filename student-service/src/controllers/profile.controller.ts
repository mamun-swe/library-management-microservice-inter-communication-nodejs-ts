
import { Request, Response, NextFunction } from "express"
import { Validators } from "../validators"
import { isValidMongooseId } from "../middleware/mongooseId.middleware"
import Student from "../models/student.model"

/* Profile info */
export const Me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        await isValidMongooseId(id)
        const result = await Student.findById(id, { password: 0 })

        res.status(200).json({
            status: true,
            data: result
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Update an item */
export const Update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let uniqueErrors: any = {}
        const { id } = req.user
        const {
            name,
            email,
            phone,
            department,
            address,
            city,
            country
        } = req.body

        await isValidMongooseId(id)

        /* Check validation */
        const validate = await Validators.Student.Update(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Account available */
        const isAvailableAccount = await Student.findById(id)
        if (!isAvailableAccount) {
            return res.status(404).json({
                status: false,
                errors: { message: "Account not available." }
            })
        }

        /* Check student email */
        const isEmailAvailable = await Student.findOne({
            $and: [
                { _id: { $ne: id } },
                { email }
            ]
        })

        if (isEmailAvailable) {
            uniqueErrors.email = "E-mail already used."
        }

        /* Check student phone */
        const isPhoneAvailable = await Student.findOne({
            $and: [
                { _id: { $ne: id } },
                { phone }
            ]
        })

        if (isPhoneAvailable) {
            uniqueErrors.phone = "Phone already used."
        }

        if (Object.keys(uniqueErrors).length > 0) {
            return res.status(409).json({
                status: false,
                errors: uniqueErrors
            })
        }

        await Student.findByIdAndUpdate(
            id,
            {
                $set: {
                    name,
                    email,
                    phone,
                    department,
                    address,
                    city,
                    country
                }
            }
        )

        res.status(201).json({
            status: true,
            message: "Successfully account updated."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}