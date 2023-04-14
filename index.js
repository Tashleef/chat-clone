const express = require("express");
const {formateMessage} = require("./structure/message");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
	console.log("Connected");

	socket.on("joinRoom", ({username, room}) => {
		io.emit("roomUsers", {room, username});
		socket.on("chatMessage", (msg) => {
			io.emit(
				"message",
				formateMessage({
					username,
					text: msg,
				})
			);
		});
		io.emit(
			"message",
			formateMessage({
				username,
				text: `Welcome ${username}`,
			})
		);
	});

	socket.on("disconnect", () => {
		console.log("Disconnected");
	});
});

http.listen(3000, () => {
	console.log("Listening on port 3000");
});
