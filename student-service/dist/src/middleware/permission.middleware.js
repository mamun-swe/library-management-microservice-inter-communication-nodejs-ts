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
exports.isAuthentic = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Authentication
const isAuthentic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = yield req.headers.authorization;
        if (!token)
            return res.status(404).json({
                status: false,
                errors: { message: "Token not found" }
            });
        /* decode token */
        const splitToken = yield ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        const decode = yield jsonwebtoken_1.default.verify(`${splitToken}`, `${process.env.JWT_SECRET}`);
        req.user = {
            id: decode.id,
            name: decode.name
        };
        next();
    }
    catch (error) {
        if (error) {
            if ((error === null || error === void 0 ? void 0 : error.name) === 'TokenExpiredError') {
                return res.status(410).json({
                    status: false,
                    errors: { message: "Token expired" }
                });
            }
            return res.status(501).json({
                status: false,
                errors: { message: "Unauthorized request" }
            });
        }
    }
});
exports.isAuthentic = isAuthentic;
