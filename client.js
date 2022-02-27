const net = require("net");
const { IP, PORT, initials } = require("./constants");

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT,
  });

  // interpret incoming data as text
  conn.setEncoding("utf8");

  // when the client has first connected to the server...
  conn.on('connect', () => {
    console.log('Successfully connected to game server.');
    conn.write(initials); // sends initials to identify snake
    // conn.write('Move: up'); // testing communication protocols
  });

  // interpret data from server
  conn.on('data', data => {
    console.log('Server says: ', data);
  });


  return conn;
};

module.exports = {
  connect
};