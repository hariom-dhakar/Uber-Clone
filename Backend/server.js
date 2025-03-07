const http = require('http')
const app = require("./app")
const port = process.env.PORT || 3000;
const { initializeSocket } =require('./socket.js')
const server = http.createServer(app);

initializeSocket(server);
server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

server.on('error', (error) => {
    console.error('Error starting the server:', error);
});