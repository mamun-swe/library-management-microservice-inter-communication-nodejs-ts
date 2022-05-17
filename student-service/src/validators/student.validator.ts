
import { StudentType, SignInType } from "../types"
import { isEmpty, isValidEmail, isValidPhone } from "../helpers"

/* SignUp validation */
const SignUp = (data: StudentType) => {
    let errors: StudentType = <StudentType>{}

    if (!data.student_id || isEmpty(data.student_id)) errors.student_id = "Student Id is required."
    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "Address isn't valid."

    if (!data.phone || isEmpty(data.phone)) errors.phone = "Phone is required."
    if (data.phone && !isValidPhone(data.phone)) errors.phone = "Number isn't valid."

    if (!data.department || isEmpty(data.department)) errors.department = "Department is required."
    if (!data.address || isEmpty(data.address) || isValidPhone(data.address)) errors.address = "Address is required."
    if (!data.city || isEmpty(data.city)) errors.city = "City is required."
    if (!data.country || isEmpty(data.country)) errors.country = "Country is required."
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* SignIn validation */
const SignIn = (data: SignInType) => {
    let errors: SignInType = <SignInType>{}

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "Address isn't valid."
    if (!data.password || isEmpty(data.password)) errors.password = "Password is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

/* Update validation */
const Update = (data: StudentType) => {
    let errors: StudentType = <StudentType>{}

    if (!data.name || isEmpty(data.name)) errors.name = "Name is required."

    if (!data.email || isEmpty(data.email)) errors.email = "E-mail is required."
    if (data.email && !isValidEmail(data.email)) errors.email = "Address isn't valid."

    if (!data.phone || isEmpty(data.phone)) errors.phone = "Phone is required."
    if (data.phone && !isValidPhone(data.phone)) errors.phone = "Number isn't valid."

    if (!data.department || isEmpty(data.department)) errors.department = "Department is required."
    if (!data.address || isEmpty(data.address) || isValidPhone(data.address)) errors.address = "Address is required."
    if (!data.city || isEmpty(data.city)) errors.city = "City is required."
    if (!data.country || isEmpty(data.country)) errors.country = "Country is required."

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const Student = {
    SignUp,
    SignIn,
    Update
}