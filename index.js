const express = require("express");
const { formateMessage } = require("./structure/message");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const {
	getAllUsers,
	addUser,
	deleteUser,
	findUser,
} = require("./structure/user");
app.use(express.static("public"));

const CryptoJS = require("crypto-js");

var aeskey = "bQeThWmZq4t7w!z%C*F-JaNcRfUjXn2r";

io.on("connection", (socket) => {
	console.log("Connected");
	socket.on("joinRoom", ({ username, room }) => {
		socket.join(room);
		const id = socket.id;
		addUser({ id, username, room });
		let users = getAllUsers({ room });
		io.to(room).emit("roomUsers", { room, users });
		socket.on("chatMessage", (msg) => {
			console.log("message in server side before decryption", msg);
			const message = CryptoJS.AES.decrypt(msg, aeskey).toString(
				CryptoJS.enc.Utf8
			);
			console.log("message in server side after decryption", message);
			io.to(room).emit(
				"message",
				formateMessage({
					username,
					text: message,
				})
			);
		});
		socket.broadcast.to(room).emit(
			"message",
			formateMessage({
				username: "Chat",
				text: `Welcome ${username}`,
			})
		);
	});

	socket.on("disconnect", () => {
		const user = deleteUser({ id: socket.id });
		if (!user) return;
		const { room, username } = user;
		io.to(room).emit(
			"message",
			formateMessage({
				username: "Chat",
				text: `${username} left the chat`,
			})
		);
		const users = getAllUsers({ room });
		io.to(user.room).emit("roomUsers", { room, users });
	});
});

http.listen(process.env.PORT || 3000, () => {
	console.log("Listening...");
});
