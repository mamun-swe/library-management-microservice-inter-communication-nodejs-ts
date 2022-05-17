
/* E-mail validator */
export const isValidEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

/* BD phone number validator */
export const isValidPhone = (phone: string) => {
    const regex = /^(?:\+88|88)?(01[3-9]\d{8})$/i
    return regex.test(phone)
}

/* Empty value check */
export const isEmpty = (data: string) => {
    return (data == null || data === '' || data.length === 0)
}
