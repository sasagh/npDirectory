const RegularExpression = {
    passportNumber: /^\d{11}$/,
    phoneNumber: /^(\+995)[\s-]?[5]\d{1,3}[\s-]?\d{1,3}[\s-]?\d{1,3}[\s-]?\d{1,3}$/,
    email: /^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/,
}

Object.freeze(RegularExpression);

module.exports = RegularExpression;