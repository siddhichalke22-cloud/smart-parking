function isEmpty(value) {
    return value.trim() === "";
}

function isNumber(value) {
    return !isNaN(value) && value !== "";
}

module.exports = {
    isEmpty,
    isNumber
};