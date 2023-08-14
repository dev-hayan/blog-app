// export const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`


const validateEmail = function (email) {
    if (!/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(email)) {
        throw new Error('Invalid email address')
    }
}

module.exports.validateEmail = validateEmail
