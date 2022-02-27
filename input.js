const { UP, DOWN, LEFT, RIGHT, HIGHFIVE } = require("./constants");

// Stores the active TCP connection object.
let connection;

// setup interface to handle user input from stdin
const setupInput = (conn) => {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding("utf8");
  stdin.resume();
  stdin.on('data', key => {
    handleUserInput(key); 
  });
  return stdin;
};

// define setIntervals as global scope so they can be accessed by clearInterval function
let wInterval;
let aInterval;
let sInterval;
let dInterval;

const handleUserInput = function(key) {
  
  // control to exit game
  if (key === '\u0003') {
    process.exit();
  }
  
  // control for emote
  if (key === 'q') {
    console.log('q key was pressed to send a highfive!');
    connection.write(HIGHFIVE);
  }

  // controls for player direction
  if (key === 'w') {
    console.log('W key was pressed to go up!');
    clearInterval(aInterval); // clears other ongoing intervals 
    clearInterval(sInterval);
    clearInterval(dInterval);
    wInterval = setInterval(() => {
      connection.write(UP);
    }, 50);
  }
  if (key === 's') {
    console.log('s key was pressed to go down!');
    clearInterval(wInterval);
    clearInterval(aInterval);
    clearInterval(dInterval);
    sInterval = setInterval(() => {
      connection.write(DOWN);
    }, 50);
  }
  if (key === 'a') {
    console.log('a key was pressed to go left!');
    clearInterval(wInterval);
    clearInterval(sInterval);
    clearInterval(dInterval);
    aInterval = setInterval(() => {
      connection.write(LEFT);
    }, 50);
  }
  if (key === 'd') {
    console.log('d key was pressed to go right!');
    clearInterval(wInterval);
    clearInterval(aInterval);
    clearInterval(sInterval);
    dInterval = setInterval(() => {
      connection.write(RIGHT);
    }, 50);
  }
};

module.exports = {
  setupInput
};