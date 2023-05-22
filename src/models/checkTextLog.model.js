import { model, Schema } from "mongoose";

const checkTextLogSchema = new Schema(
	{
		type: {
			type: String,
			required: true,
		},
		text: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

async function saveLog({ type, text }) {
	await checkTextModel.create({ type, text });
}

checkTextLogSchema.statics.saveLog = saveLog;

const checkTextModel = model("CheckTextLog", checkTextLogSchema);

export default checkTextModel;
