import { expect, sinon } from "../chai.config.js";
import CheckTextModel from "../../src/models/checkTextLog.model";
import { mongoConnect, mongoDisconnect } from "../../src/config/mongo";

describe("Models: Check text model unit test", () => {
	let checkTextModelStub;

	before(async () => {
		await mongoConnect("mongodb://localhost:27017/checktext-api-test");
	});

	after(async () => {
		await mongoDisconnect();
	});

	beforeEach(() => {
		checkTextModelStub = sinon.stub(CheckTextModel, "create");
	});

	afterEach(async () => {
		checkTextModelStub.restore();
		await CheckTextModel.deleteMany({});
	});

	it("[SUCCESS] Create check text with stub", async () => {
		checkTextModelStub.returns();

		const input = { type: "a", text: "a" };
		CheckTextModel.saveLog(input);

		expect(checkTextModelStub).to.be.calledWith(input);
	});

	it("[SUCCESS] Create check text successful", async () => {
		checkTextModelStub.restore();

		const input = { type: "asd", text: "texto" };

		CheckTextModel.saveLog(input);

		const result = await CheckTextModel.findOne(input).exec();
		expect(result).not.to.be.null;
		expect(checkTextModelStub).not.to.be.called;
	});

	it("[SUCCESS] Check text doesnt exists", async () => {
		checkTextModelStub.restore();
		const result = await CheckTextModel.findOne({
			type: "a",
			text: "t",
		}).exec();
		expect(result).to.be.null;
		expect(checkTextModelStub).not.to.be.called;
	});
});
