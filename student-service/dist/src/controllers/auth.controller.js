"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignIn = exports.SignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const validators_1 = require("../validators");
const student_model_1 = __importDefault(require("../models/student.model"));
/* Register an account */
const SignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uniqueErrors = {};
        const { student_id, name, email, phone, department, address, city, country, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.Validators.Student.SignUp(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Check unique student ID */
        const isIdAvailable = yield student_model_1.default.findOne({ student_id });
        if (isIdAvailable) {
            uniqueErrors.student_id = "Student ID already used.";
        }
        /* Check student email */
        const isEmailAvailable = yield student_model_1.default.findOne({ email });
        if (isEmailAvailable) {
            uniqueErrors.email = "E-mail already used.";
        }
        /* Check student phone */
        const isPhoneAvailable = yield student_model_1.default.findOne({ phone });
        if (isPhoneAvailable) {
            uniqueErrors.phone = "Phone already used.";
        }
        if (Object.keys(uniqueErrors).length > 0) {
            return res.status(409).json({
                status: false,
                errors: uniqueErrors
            });
        }
        /* hash password generate */
        const hashPassword = yield bcryptjs_1.default.hash(password, 10);
        const newStudent = new student_model_1.default({
            student_id,
            name,
            email,
            phone,
            department,
            address,
            city,
            country,
            password: hashPassword
        });
        yield newStudent.save();
        res.status(201).json({
            status: true,
            message: "Successfully account created."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.SignUp = SignUp;
/* Login to account */
const SignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        /* Check validation */
        const validate = yield validators_1.Validators.Student.SignIn(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Account find using email */
        const account = yield student_model_1.default.findOne({ email });
        if (!account) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            });
        }
        /* Compare with password */
        const result = yield bcryptjs_1.default.compare(password, account.password);
        if (!result) {
            return res.status(404).json({
                status: false,
                errors: {
                    message: "Invalid email or password."
                }
            });
        }
        /* Generate JWT token */
        const token = yield jsonwebtoken_1.default.sign({
            id: account._id,
            name: account.name
        }, `${process.env.JWT_SECRET}`, { expiresIn: '1d' });
        return res.status(200).json({
            status: true,
            token
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.SignIn = SignIn;
