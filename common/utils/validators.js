const Language = require('../enum/Language');
const Gender = require('../enum/Gender');
const RelationType = require('../enum/RelationType');
const ImageType = require('../enum/ImageType');
const RegexPattern = require('../enum/RegexPattern');

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

        if(language === Language.ENGLISH && !isEnglishCharacter(c))
            return false;

        if(language === Language.GEORGIAN && !isGeorgianCharacter(c))
            return false;
    }

    return true;
}

exports.validateGender = (gender) => Object.values(Gender).includes(gender.toUpperCase());

exports.validatePassportNumber = (str) => RegexPattern.PASSPORT_NUMBER.test(str);

exports.validateDate = (date) => {
    date = new Date(date);
    date.setFullYear(date.getFullYear()+18)
    const currentTime = new Date();
    currentTime.setHours(0,0,0,0);

    return date.getTime() <= currentTime.getTime();
}

exports.validateContactInformation = (contactInformation) => {
    if(!contactInformation)
        return false;
        
    for(const information of contactInformation){
        const isEmail = RegexPattern.EMAIL.test(information);
        const isPhoneNumber = RegexPattern.PHONE_NUMBER.test(information);

        if(!isEmail && !isPhoneNumber)
            return false;
    }

    return true;
}

exports.validateRelationType = (relationType) => Object.values(RelationType).includes(relationType.toUpperCase());

exports.validateImage = (file) => {
    if(!file)
        return false

    const fileType = file['mimetype'];

    return Object.values(ImageType).includes(fileType);
}

isGeorgianCharacter = (c) => c >= 'ა' && c <= 'ჰ';

isEnglishCharacter = (c) => (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');

containsDigit = (str) => /\d/.test(str);