const { ask, closeInput } = require("./utils/input");

const authService = require("./services/authService");
const parkingService = require("./services/parkingService");
const reservationService = require("./services/reservationService");
const paymentService = require("./services/paymentService");
const analyticsService = require("./services/analyticsService");

let currentUser = null;

async function mainMenu() {

    console.log("\n==============================");
    console.log("     SMART STREET PARKING");
    console.log("==============================");
    console.log("1. Register");
    console.log("2. Login");
    console.log("3. Exit");
    console.log("==============================");

    const choice = await ask("Enter your choice: ");

    if (choice === "1") {
        await register();
    }
    else if (choice === "2") {
        await login();
    }
    else if (choice === "3") {
        console.log("Thank you!");
        closeInput();
    }
    else {
        console.log("Invalid choice!");
        await mainMenu();
    }
}

async function register() {

    console.log("\n========== REGISTER ==========");

    const name = await ask("Name: ");
    const phone = await ask("Phone: ");
    const password = await ask("Password: ");

    const success = authService.register(
        name,
        phone,
        password,
        "driver"
    );

    if (success) {
        console.log("Registration successful!");
    }
    else {
        console.log("Phone already registered!");
    }

    await mainMenu();
}

async function login() {

    console.log("\n========== LOGIN ==========");

    const phone = await ask("Phone: ");
    const password = await ask("Password: ");

    const user = authService.login(phone, password);

    if (!user) {
        console.log("Invalid login!");
        await mainMenu();
        return;
    }

    currentUser = user;

    console.log("\nWelcome", user.name);

    if (user.role === "admin") {
        await adminMenu();
    }
    else {
        await driverMenu();
    }
}

async function driverMenu() {

    console.log("\n========== DRIVER MENU ==========");
    console.log("1. View Parking Zones");
    console.log("2. View Available Spots");
    console.log("3. Reserve Spot");
    console.log("4. Cancel Reservation");
    console.log("5. Make Payment");
    console.log("6. Logout");

    const choice = await ask("Enter your choice: ");

    if (choice === "1") {

        const zones = parkingService.getZones();

        console.log("\nPARKING ZONES");

        zones.forEach(zone => {
            console.log(
                zone.id,
                "|",
                zone.name,
                "|",
                zone.location,
                "| ₹" + zone.price
            );
        });

        await driverMenu();
    }

    else if (choice === "2") {

        const spots = parkingService.getAvailableSpots();

        console.log("\nAVAILABLE SPOTS");

        spots.forEach(spot => {
            console.log(
                "Spot ID:",
                spot.id,
                "Zone:",
                spot.zoneId,
                "Spot:",
                spot.spotNumber
            );
        });

        await driverMenu();
    }

    else if (choice === "3") {

        const spotId = await ask("Enter Spot ID: ");
        const hours = await ask("Enter parking hours: ");

        const result = reservationService.reserveSpot(
            currentUser.id,
            spotId,
            hours
        );

        console.log(result.message || "Reservation successful!");

        await driverMenu();
    }

    else if (choice === "4") {

        const reservationId = await ask(
            "Enter Reservation ID: "
        );

        const success =
            reservationService.cancelReservation(reservationId);

        console.log(
            success
                ? "Reservation cancelled!"
                : "Reservation not found!"
        );

        await driverMenu();
    }

    else if (choice === "5") {

        const reservationId = await ask(
            "Reservation ID: "
        );

        const amount = await ask(
            "Amount: ₹"
        );

        const payment = paymentService.makePayment(
            currentUser.id,
            reservationId,
            amount
        );

        console.log("Payment successful!");
        console.log("Payment ID:", payment.id);

        await driverMenu();
    }

    else if (choice === "6") {

        currentUser = null;

        await mainMenu();
    }

    else {

        console.log("Invalid choice!");

        await driverMenu();
    }
}

async function adminMenu() {

    console.log("\n========== ADMIN MENU ==========");
    console.log("1. Add Parking Zone");
    console.log("2. View Parking Zones");
    console.log("3. View Parking Spots");
    console.log("4. View Reservations");
    console.log("5. View Analytics");
    console.log("6. Logout");

    const choice = await ask("Enter your choice: ");

    if (choice === "1") {

        const name = await ask("Zone name: ");
        const location = await ask("Location: ");
        const totalSpots = await ask("Number of spots: ");
        const price = await ask("Price per hour: ₹");

        const zone = parkingService.addZone(
            name,
            location,
            totalSpots,
            price
        );

        console.log("\nZone added!");
        console.log("Zone ID:", zone.id);

        await adminMenu();
    }

    else if (choice === "2") {

        const zones = parkingService.getZones();

        console.log("\n========== ZONES ==========");

        zones.forEach(zone => {
            console.log(
                "ID:", zone.id,
                "| Name:", zone.name,
                "| Location:", zone.location,
                "| Spots:", zone.totalSpots,
                "| Price:", zone.price
            );
        });

        await adminMenu();
    }

    else if (choice === "3") {

        const spots = parkingService.getSpots();

        console.log("\n========== SPOTS ==========");

        spots.forEach(spot => {
            console.log(
                "ID:", spot.id,
                "| Zone:", spot.zoneId,
                "| Spot:", spot.spotNumber,
                "| Status:", spot.status
            );
        });

        await adminMenu();
    }

    else if (choice === "4") {

        const reservations =
            reservationService.getReservations();

        console.log("\n========== RESERVATIONS ==========");

        reservations.forEach(reservation => {
            console.log(reservation);
        });

        await adminMenu();
    }

    else if (choice === "5") {

        analyticsService.showAnalytics();

        await adminMenu();
    }

    else if (choice === "6") {

        currentUser = null;

        await mainMenu();
    }

    else {

        console.log("Invalid choice!");

        await adminMenu();
    }
}

mainMenu();