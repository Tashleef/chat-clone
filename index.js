const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/chat", (req, res) => {
    return res.status(200).send("ok");
});

io.on("connection", (socket) => {
    console.log("Connected");

    socket.on("chatMessage", (msg) => {
        console.log(msg);
        socket.broadcast.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log("Disconnected");
    });
});

http.listen(3000, () => {
    console.log("Listening on port 3000");
});
