const express = require("express");
const app = express();
const http = require("http").Server(app);
const cors = require("cors");
const PORT = process.env.PORT || 4000;
const socketIO = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = [];

socketIO.on("connection", (socket) => {
	console.log(`${socket.id} user just connected!`);

	socket.on("createRoom", (name) => {
		console.log("Room Created", name)
		socket.join(name);
		chatRooms.unshift({ id: generateID(), name, messages: [] });
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id);
		// console.log(chatRooms);
		socket.emit("foundRoom", result[0].messages);
		// console.log("Messages Form", result[0].messages);
	});

	socket.on("newMessage", (data) => {
		console.log("New Message Called in Server", data)
		// socket.emit("roomMessage", data);
		const { room_id, message, user} = data;
		const hour = new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`;
        const mins = new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`;

		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = {
			id: generateID(),
			text: message,
			user,
			time: `${hour}:${mins}`,
		};
		console.log("New Message", newMessage);
		socket.to(result[0].name).emit("roomMessage", newMessage);
		result[0].messages.push(newMessage);
		socket.emit("roomMessage", newMessage);
		socket.emit("roomsList", chatRooms);
		socket.emit("foundRoom", result[0].messages);
	});
	socket.on("disconnect", () => {
		socket.disconnect();
		console.log("A user disconnected");
	});

	socket.on('deleteRoom', (room_id)=>{
		let result = chatRooms.filter((room) => room.id == room_id);
		// socket.leave(result[0].name);
		chatRooms = chatRooms.filter((room) => room.id != room_id);
		socket.emit("roomsList", chatRooms);
	})
});

app.get("/api", (req, res) => {
	res.json(chatRooms);
});

app.post("/api/room/:room_id/newmessage/", (req, res) => {
	const { room_id } = req.params;
	const { message, user, timestamp } = req.body;
	let result = chatRooms.filter((room) => room.id == room_id);
	const newMessage = {
		id: generateID(),
		text: message,
		user,
		time: `${timestamp.hour}:${timestamp.mins}`,
	};
	console.log("New Message", newMessage);
	socket.to(result[0].name).emit("roomMessage", newMessage);
	result[0].messages.push(newMessage);
	res.json(chatRooms);
})

app.get("/api/room/:room_id", (req, res) => {
	const { room_id } = req.params;
	let result = chatRooms.filter((room) => room.id == room_id);
	res.json(result[0].messages);
});

http.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});



