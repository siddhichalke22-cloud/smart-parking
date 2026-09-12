const path = require("path");
const { readData, writeData } = require("../utils/fileManager");
const parkingService = require("./parkingService");

const file = path.join(__dirname, "../data/reservations.json");

function reserveSpot(userId, spotId, hours) {

    const spots = parkingService.getSpots();

    const spot = spots.find(
        spot => spot.id === Number(spotId)
    );

    if (!spot) {
        return {
            success: false,
            message: "Spot not found"
        };
    }

    if (spot.status !== "available") {
        return {
            success: false,
            message: "Spot is not available"
        };
    }

    const reservations = readData(file);

    const reservation = {
        id: Date.now(),
        userId: userId,
        spotId: Number(spotId),
        hours: Number(hours),
        status: "active",
        date: new Date().toLocaleString()
    };

    reservations.push(reservation);

    writeData(file, reservations);

    parkingService.updateSpotStatus(spotId, "reserved");

    return {
        success: true,
        reservation: reservation
    };
}

function cancelReservation(reservationId) {

    const reservations = readData(file);

    const reservation = reservations.find(
        r => r.id === Number(reservationId)
    );

    if (!reservation) {
        return false;
    }

    reservation.status = "cancelled";

    writeData(file, reservations);

    parkingService.updateSpotStatus(
        reservation.spotId,
        "available"
    );

    return true;
}

function getReservations() {
    return readData(file);
}

module.exports = {
    reserveSpot,
    cancelReservation,
    getReservations
};