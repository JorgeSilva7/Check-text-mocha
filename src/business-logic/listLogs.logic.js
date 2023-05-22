import CheckTextModel from "../models/checkTextLog.model";

async function listLogs() {
	const logs = await CheckTextModel.find({}).exec();

	return logs;
}

export default listLogs;
