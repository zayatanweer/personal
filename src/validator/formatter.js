const trimString = "           This is the Trim Process        "
function changeToTrim(){
console.log(trimString.trim())
}

const lowerCase = " Hi This is Tanweer zaya and i m learning Coding"
function changeToLowerCase(){
    console.log(lowerCase.toLowerCase())
}


function changeToUpperCase(){
    const upperCase = " Hi This is Tanweer zaya and i m learning Coding, from india's best coding bootcamp 'Function-up'"
    console.log(upperCase)
    console.log(upperCase.toUpperCase())
}
module.exports.trim = changeToTrim
module.exports.changeToLower = changeToLowerCase
module.exports.changeToUpper = changeToUpperCase