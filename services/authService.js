const path = require("path");
const { readData, writeData } = require("../utils/fileManager");

const file = path.join(__dirname, "../data/users.json");

function register(name, phone, password, role) {
    const users = readData(file);

    const exists = users.find(user => user.phone === phone);

    if (exists) {
        return false;
    }

    const user = {
        id: Date.now(),
        name: name,
        phone: phone,
        password: password,
        role: role
    };

    users.push(user);

    writeData(file, users);

    return true;
}

function login(phone, password) {
    const users = readData(file);

    return users.find(
        user => user.phone === phone && user.password === password
    );
}

module.exports = {
    register,
    login
};