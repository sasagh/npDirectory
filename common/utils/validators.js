const Language = require('../constants/Language');
const Gender = require('../constants/Gender');
const RelationType = require('../constants/RelationType');
const RegularExpression = require('../constants/RegularExpression');

exports.validateName = (str) => {
    if(!str || containsDigit(str))
        return false;

    let language;
    let firstCharacter = str.charAt(0);

    if(isEnglishCharacter(firstCharacter))
        language = Language.ENGLISH;
    else if(isGeorgianCharacter(firstCharacter))
        language = Language.GEORGIAN;

    if(!language)
        return false;

    for(let i=1; i<str.length; i++){
        let c = str.charAt(i);

        if(language == Language.ENGLISH && !isEnglishCharacter(c))
            return false;

        if(language == Language.GEORGIAN && !isGeorgianCharacter(c))
            return false;
    }

    return true;
}

exports.validateGender = (gender) => Object.values(Gender).includes(gender.toUpperCase());

exports.validatePassportNumber = (str) => RegularExpression.passportNumber.test(str);

exports.validateDate = (date) => {
    date = new Date(date);
    date.setFullYear(date.getFullYear()+18)
    const currentTime = new Date();
    currentTime.setHours(0,0,0,0);

    return date.getTime() <= currentTime.getTime();
}

exports.validateContactInformation = (contactInformation) => {
    for(const information of contactInformation){
        const isEmail = RegularExpression.email.test(information);
        const isPhoneNumber = RegularExpression.phoneNumber.test(information);

        if(!isEmail && !isPhoneNumber)
            return false;
    }

    return true;
}

exports.validateRelationType = (relationType) => Object.values(RelationType).includes(relationType.toUpperCase());

isGeorgianCharacter = (c) => c >= 'ა' && c <= 'ჰ';

isEnglishCharacter = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

containsDigit = (str) => /\d/.test(str);