const path = require("path");
const { readData, writeData } = require("../utils/fileManager");

const zonesFile = path.join(__dirname, "../data/zones.json");
const spotsFile = path.join(__dirname, "../data/spots.json");

function addZone(name, location, totalSpots, price) {

    const zones = readData(zonesFile);

    const zone = {
        id: Date.now(),
        name: name,
        location: location,
        totalSpots: Number(totalSpots),
        price: Number(price)
    };

    zones.push(zone);

    writeData(zonesFile, zones);

    // Automatically create parking spots
    const spots = readData(spotsFile);

    for (let i = 1; i <= totalSpots; i++) {
        spots.push({
            id: Date.now() + i,
            zoneId: zone.id,
            spotNumber: i,
            status: "available"
        });
    }

    writeData(spotsFile, spots);

    return zone;
}

function getZones() {
    return readData(zonesFile);
}

function getSpots() {
    return readData(spotsFile);
}

function getAvailableSpots() {
    const spots = readData(spotsFile);

    return spots.filter(spot => spot.status === "available");
}

function updateSpotStatus(spotId, status) {

    const spots = readData(spotsFile);

    const spot = spots.find(spot => spot.id === Number(spotId));

    if (!spot) {
        return false;
    }

    spot.status = status;

    writeData(spotsFile, spots);

    return true;
}

module.exports = {
    addZone,
    getZones,
    getSpots,
    getAvailableSpots,
    updateSpotStatus
};