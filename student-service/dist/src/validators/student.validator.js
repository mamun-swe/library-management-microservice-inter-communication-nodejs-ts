"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const helpers_1 = require("../helpers");
/* SignUp validation */
const SignUp = (data) => {
    let errors = {};
    if (!data.student_id || (0, helpers_1.isEmpty)(data.student_id))
        errors.student_id = "Student Id is required.";
    if (!data.name || (0, helpers_1.isEmpty)(data.name))
        errors.name = "Name is required.";
    if (!data.email || (0, helpers_1.isEmpty)(data.email))
        errors.email = "E-mail is required.";
    if (data.email && !(0, helpers_1.isValidEmail)(data.email))
        errors.email = "Address isn't valid.";
    if (!data.phone || (0, helpers_1.isEmpty)(data.phone))
        errors.phone = "Phone is required.";
    if (data.phone && !(0, helpers_1.isValidPhone)(data.phone))
        errors.phone = "Number isn't valid.";
    if (!data.department || (0, helpers_1.isEmpty)(data.department))
        errors.department = "Department is required.";
    if (!data.address || (0, helpers_1.isEmpty)(data.address) || (0, helpers_1.isValidPhone)(data.address))
        errors.address = "Address is required.";
    if (!data.city || (0, helpers_1.isEmpty)(data.city))
        errors.city = "City is required.";
    if (!data.country || (0, helpers_1.isEmpty)(data.country))
        errors.country = "Country is required.";
    if (!data.password || (0, helpers_1.isEmpty)(data.password))
        errors.password = "Password is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
/* SignIn validation */
const SignIn = (data) => {
    let errors = {};
    if (!data.email || (0, helpers_1.isEmpty)(data.email))
        errors.email = "E-mail is required.";
    if (data.email && !(0, helpers_1.isValidEmail)(data.email))
        errors.email = "Address isn't valid.";
    if (!data.password || (0, helpers_1.isEmpty)(data.password))
        errors.password = "Password is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
/* Update validation */
const Update = (data) => {
    let errors = {};
    if (!data.name || (0, helpers_1.isEmpty)(data.name))
        errors.name = "Name is required.";
    if (!data.email || (0, helpers_1.isEmpty)(data.email))
        errors.email = "E-mail is required.";
    if (data.email && !(0, helpers_1.isValidEmail)(data.email))
        errors.email = "Address isn't valid.";
    if (!data.phone || (0, helpers_1.isEmpty)(data.phone))
        errors.phone = "Phone is required.";
    if (data.phone && !(0, helpers_1.isValidPhone)(data.phone))
        errors.phone = "Number isn't valid.";
    if (!data.department || (0, helpers_1.isEmpty)(data.department))
        errors.department = "Department is required.";
    if (!data.address || (0, helpers_1.isEmpty)(data.address) || (0, helpers_1.isValidPhone)(data.address))
        errors.address = "Address is required.";
    if (!data.city || (0, helpers_1.isEmpty)(data.city))
        errors.city = "City is required.";
    if (!data.country || (0, helpers_1.isEmpty)(data.country))
        errors.country = "Country is required.";
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
exports.Student = {
    SignUp,
    SignIn,
    Update
};
