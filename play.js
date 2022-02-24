const { connect } = require("./client"); // "Pull in" connect function
const { setupInput } = require("./input"); // "Pull in" setupInput function

console.log("Connecting ...");
connect();

setupInput();