function calculatePrice(basePrice, occupancy) {
    if (occupancy >= 90) {
        return basePrice * 2;
    }

    if (occupancy >= 70) {
        return basePrice * 1.5;
    }

    return basePrice;
}

module.exports = {
    calculatePrice
};