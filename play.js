const { connect } = require("./client"); // "Pull in" connect function
const { setupInput } = require("./input"); // "Pull in" setupInput function

const connection = connect();

console.log("Connecting ...");

setupInput(connection); // calls setupInput and passes through connection object