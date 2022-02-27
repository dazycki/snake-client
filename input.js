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

let input;

const handleUserInput = function(key) {
  
  // define super function for input to make use of clear interval + DRY code
  const directionInput = function(key) {
    input = setInterval(() => {
      connection.write(key);
    }, 100); // controls speed of snake
  };

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
    clearInterval(input); // clears other ongoing intervals
    directionInput(UP); // calls directionInput function to connection.write direction
  }
  if (key === 's') {
    console.log('s key was pressed to go down!');
    clearInterval(input);
    directionInput(DOWN);
  }
  if (key === 'a') {
    console.log('a key was pressed to go left!');
    clearInterval(input);
    directionInput(LEFT);
  }
  if (key === 'd') {
    console.log('d key was pressed to go right!');
    clearInterval(input);
    directionInput(RIGHT);
  }
};

module.exports = {
  setupInput
};