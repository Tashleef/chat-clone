const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
// TODO fix clean code in back-end
const sendMessage = (url, msg) => {};
