const express = require("express");
const app = express();
const server = require("http").createServer(app);
const {client} = require("./config/db-connection");
const {Server} = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");

// making the database connection

app.use(cors());
app.use(morgan("combined"));

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

const port = 4000;

io.on("connection", (socket) => {
	console.log(new Date().toString(), "- New connection detected ");

	socket.on("send_user_id", (data) => {
		client.query(
			`SELECT * FROM message WHERE from_user_id = '${data.userId}' OR to_user_id = '${data.userId}'`,
			function (error, result) {
				if (error) throw error;

				let responseData = result.rows;

				socket.emit("my_messages", responseData);

				console.log(new Date().toString(), "- successfull response.");

				return;
			},
		);
	});

	socket.on("find_all_vendors", function (data) {
		client.query(`SELECT * FROM vendor`, function (error, result) {
			if (error) throw error;

			let responseData = result.rows;

			socket.emit("vendors_data", responseData);

			console.log(new Date().toString(), "- successfull response.");
			return;
		});
	});

	socket.on("join_room", (room) => {
		socket.join(room);

		console.log(`user with id ${socket.id} has joined the room ${room}`);
		return;
	});

	socket.on("send_message", function (data) {
		console.log(data.room);

		socket.to(data.room).emit("receive_message", data.message);
		return;
	});

	socket.on("get_user_messages", (msg) => {
		console.log(msg);
	});

	socket.on("disconnect", (socket) => {
		console.log(new Date().toString(), "User disconected: ");
	});
});

server.listen(port, () => {
	console.log(
		"::  SERVER IS RUNNING @PORT: ",
		port,
		":: time ::",
		new Date().toString(),
		"::",
	);
});