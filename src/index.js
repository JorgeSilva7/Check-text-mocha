import { config } from "dotenv";
config();

import express from "express";
import checkTextRouter from "./routers/checkText.router.js";
import environment from "./config/environment.js";
import { mongoConnect } from "./config/mongo.js";

const { PORT } = environment;

const server = express();

server.use(express.json());

server.use("/check_text", checkTextRouter);

async function startServer() {
	await mongoConnect();
	server.listen(PORT, () => {
		console.log(`Server running on ${PORT}`);
	});
}

startServer();
