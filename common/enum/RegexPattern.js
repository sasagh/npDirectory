const RegexPattern = {
    PASSPORT_NUMBER: /^\d{11}$/,
    PHONE_NUMBER: /^(\+995)[\s-]?[5]\d{1,3}[\s-]?\d{1,3}[\s-]?\d{1,3}[\s-]?\d{1,3}$/,
    EMAIL: /^([\w.-]+)@([\w-]+)((.(\w){2,3})+)$/,
}

Object.freeze(RegexPattern);

module.exports = RegexPattern;