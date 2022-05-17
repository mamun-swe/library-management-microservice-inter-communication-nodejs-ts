

import { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"
import Bcrypt from "bcryptjs"
import { Validators } from "../validators"
import Student from "../models/student.model"

/* Register an account */
export const SignUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let uniqueErrors: any = {}
        const {
            student_id,
            name,
            email,
            phone,
            department,
            address,
            city,
            country,
            password
        } = req.body

        /* Check validation */
        const validate = await Validators.Student.SignUp(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Check unique student ID */
        const isIdAvailable = await Student.findOne({ student_id })
        if (isIdAvailable) {
            uniqueErrors.student_id = "Student ID already used."
        }

        /* Check student email */
        const isEmailAvailable = await Student.findOne({ email })
        if (isEmailAvailable) {
            uniqueErrors.email = "E-mail already used."
        }

        /* Check student phone */
        const isPhoneAvailable = await Student.findOne({ phone })
        if (isPhoneAvailable) {
            uniqueErrors.phone = "Phone already used."
        }

        if (Object.keys(uniqueErrors).length > 0) {
            return res.status(409).json({
                status: false,
                errors: uniqueErrors
            })
        }

        /* hash password generate */
        const hashPassword = await Bcrypt.hash(password, 10)

        const newStudent = new Student({
            student_id,
            name,
            email,
            phone,
            department,
            address,
            city,
            country,
            password: hashPassword
        })

        await newStudent.save()

        res.status(201).json({
            status: true,
            message: "Successfully account created."
        })
    } catch (error: any) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}

/* Login to account */
export const SignIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body

        /* Check validation */
        const validate = await Validators.Student.SignIn(req.body)
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            })
        }

        /* Account find using email */
        const account = await Student.findOne({ email })
        if (!account) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            })
        }

        /* Compare with password */
        const result = await Bcrypt.compare(password, account.password)
        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            })
        }

        /* Generate JWT token */
        const token = await Jwt.sign(
            {
                id: account._id,
                name: account.name
            }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' }
        )

        return res.status(200).json({
            status: true,
            token
        })
    } catch (error) {
        if (error) {
            console.log(error)
            next(error)
        }
    }
}