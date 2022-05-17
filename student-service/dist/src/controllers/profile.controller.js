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
exports.Update = exports.Me = void 0;
const validators_1 = require("../validators");
const mongooseId_middleware_1 = require("../middleware/mongooseId.middleware");
const student_model_1 = __importDefault(require("../models/student.model"));
/* Profile info */
const Me = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.user;
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        const result = yield student_model_1.default.findById(id, { password: 0 });
        res.status(200).json({
            status: true,
            data: result
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Me = Me;
/* Update an item */
const Update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let uniqueErrors = {};
        const { id } = req.user;
        const { name, email, phone, department, address, city, country } = req.body;
        yield (0, mongooseId_middleware_1.isValidMongooseId)(id);
        /* Check validation */
        const validate = yield validators_1.Validators.Student.Update(req.body);
        if (!validate.isValid) {
            return res.status(422).json({
                status: false,
                errors: validate.errors
            });
        }
        /* Account available */
        const isAvailableAccount = yield student_model_1.default.findById(id);
        if (!isAvailableAccount) {
            return res.status(404).json({
                status: false,
                errors: { message: "Account not available." }
            });
        }
        /* Check student email */
        const isEmailAvailable = yield student_model_1.default.findOne({
            $and: [
                { _id: { $ne: id } },
                { email }
            ]
        });
        if (isEmailAvailable) {
            uniqueErrors.email = "E-mail already used.";
        }
        /* Check student phone */
        const isPhoneAvailable = yield student_model_1.default.findOne({
            $and: [
                { _id: { $ne: id } },
                { phone }
            ]
        });
        if (isPhoneAvailable) {
            uniqueErrors.phone = "Phone already used.";
        }
        if (Object.keys(uniqueErrors).length > 0) {
            return res.status(409).json({
                status: false,
                errors: uniqueErrors
            });
        }
        yield student_model_1.default.findByIdAndUpdate(id, {
            $set: {
                name,
                email,
                phone,
                department,
                address,
                city,
                country
            }
        });
        res.status(201).json({
            status: true,
            message: "Successfully account updated."
        });
    }
    catch (error) {
        if (error) {
            console.log(error);
            next(error);
        }
    }
});
exports.Update = Update;
