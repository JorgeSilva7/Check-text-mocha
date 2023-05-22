import { connect, disconnect } from "mongoose";
import environment from "./environment.js";

const { MONGO_URI } = environment;

async function mongoConnect(uri = null) {
	try {
		console.log("Connecting to mongo database...");
		await connect(uri ?? MONGO_URI);
		console.log("Connected =)");
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
}

async function mongoDisconnect() {
	await disconnect();
}

export { mongoConnect, mongoDisconnect };
