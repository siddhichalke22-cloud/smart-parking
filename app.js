const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
            console.log("\nYou selected Admin");
            showMenu();
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