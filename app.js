const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function adminMenu() {
    console.log("\n==============================");
    console.log("          ADMIN MENU");
    console.log("==============================");
    console.log("1. Add Parking Zone");
    console.log("2. View Parking Zones");
    console.log("3. View Parking Spots");
    console.log("4. Back");
    console.log("==============================");

    rl.question("Enter your choice: ", function(choice) {

        if (choice === "1") {
            console.log("\nAdd Parking Zone selected");
            adminMenu();
        }
        else if (choice === "2") {
            console.log("\nView Parking Zones selected");
            adminMenu();
        }
        else if (choice === "3") {
            console.log("\nView Parking Spots selected");
            adminMenu();
        }
        else if (choice === "4") {
            showMenu();
        }
        else {
            console.log("\nInvalid choice!");
            adminMenu();
        }
    });
}

function showMenu() {
    console.log("\n==============================");
    console.log("     SMART STREET PARKING");
    console.log("==============================");
    console.log("1. Driver");
    console.log("2. Admin");
    console.log("3. Exit");
    console.log("==============================");

    rl.question("Enter your choice: ", function(choice) {

        if (choice === "1") {
            console.log("\nYou selected Driver");
            showMenu();
        }
        else if (choice === "2") {
            adminMenu();
        }
        else if (choice === "3") {
            console.log("\nThank you for using Smart Parking!");
            rl.close();
        }
        else {
            console.log("\nInvalid choice!");
            showMenu();
        }
    });
}

showMenu();