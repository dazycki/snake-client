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

const handleUserInput = function (key) {
  if (key === '\u0003') {
    process.exit();
  }
  if (key === 'q') {
    console.log('q key was pressed to send a highfive!');
    connection.write('Say: Highfive!');
  }
  if (key === 'w') {
    console.log('W key was pressed to go up!');
    connection.write('Move: up');
  }
  if (key === 's') {
    console.log('s key was pressed to go down!');
    connection.write('Move: down');
  }
  if (key === 'a') {
    console.log('a key was pressed to go left!');
    connection.write('Move: left');
  }
  if (key === 'd') {
    console.log('d key was pressed to go right!');
    connection.write('Move: right');
  }
};

module.exports = {
  setupInput
};