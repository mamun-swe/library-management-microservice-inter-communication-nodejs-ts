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
exports.services = void 0;
const cote_1 = __importDefault(require("cote"));
const responderService = new cote_1.default.Responder({ name: "Library responser service" });
const services = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        responderService.on("book-list", (req, res) => {
            console.log("Hey I'm here");
        });
        next();
    }
    catch (error) {
        if (error)
            next(error);
    }
});
exports.services = services;
