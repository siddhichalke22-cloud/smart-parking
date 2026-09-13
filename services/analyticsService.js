const parkingService = require("./parkingService");
const reservationService = require("./reservationService");
const paymentService = require("./paymentService");

function showAnalytics() {

    const spots = parkingService.getSpots();
    const reservations = reservationService.getReservations();
    const payments = paymentService.getPayments();

    const totalSpots = spots.length;

    const occupied = spots.filter(
        spot => spot.status !== "available"
    ).length;

    let revenue = 0;

    payments.forEach(payment => {
        if (payment.status === "paid") {
            revenue += payment.amount;
        }
    });

    let occupancy = 0;

    if (totalSpots > 0) {
        occupancy = (occupied / totalSpots) * 100;
    }

    console.log("\n========== ANALYTICS ==========");
    console.log("Total Spots:", totalSpots);
    console.log("Occupied/Reserved:", occupied);
    console.log("Occupancy:", occupancy.toFixed(2) + "%");
    console.log("Reservations:", reservations.length);
    console.log("Revenue: ₹" + revenue);
    console.log("===============================");
}

module.exports = {
    showAnalytics
};
// completed