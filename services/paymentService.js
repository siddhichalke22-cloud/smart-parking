const path = require("path");
const { readData, writeData } = require("../utils/fileManager");

const file = path.join(__dirname, "../data/payments.json");

function makePayment(userId, reservationId, amount) {

    const payments = readData(file);

    const payment = {
        id: Date.now(),
        userId: userId,
        reservationId: reservationId,
        amount: Number(amount),
        status: "paid",
        date: new Date().toLocaleString()
    };

    payments.push(payment);

    writeData(file, payments);

    return payment;
}

function getPayments() {
    return readData(file);
}

module.exports = {
    makePayment,
    getPayments
};