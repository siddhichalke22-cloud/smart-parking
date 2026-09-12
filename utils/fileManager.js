const fs = require("fs");

function readData(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "[]");
    }

    const data = fs.readFileSync(file, "utf8");

    return JSON.parse(data);
}

function writeData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
    readData,
    writeData
};