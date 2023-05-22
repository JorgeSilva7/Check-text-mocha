import { expect, sinon } from "../chai.config.js";
import checkText from "../../src/business-logic/checkText.logic.js";
import checkTextModel from "../../src/models/checkTextLog.model.js";

describe("Business Logic: Check text unit test", () => {
	let saveLogStub;

	beforeEach(() => {
		saveLogStub = sinon.stub(checkTextModel, "saveLog");
	});

	afterEach(() => {
		saveLogStub.restore();
	});

	it("[ERROR] When the type doesnt exists in the selector should throw error", async () => {
		const input = {
			text: "",
			type: "boolean",
		};

		try {
			await checkText(input);
		} catch (error) {
			expect(error.msg).to.equal("type is not available");
			expect(error.name).to.equal("type error");
			expect(saveLogStub).to.not.have.been.called;
		}
	});

	it("[SUCCESS] Should return true when the text is a valid url", async () => {
		const input = {
			text: "www.google.cl",
			type: "url",
		};

		saveLogStub.withArgs(input).returns({});

		const result = await checkText(input);

		expect(result).to.equal(true);
		expect(saveLogStub).to.have.been.calledWith(input);
	});

	it("[SUCCESS] Should return false when the text is a invalid url", async () => {
		const input = {
			text: "asdasd",
			type: "url",
		};

		saveLogStub.withArgs(input).returns({});

		const result = await checkText(input);

		expect(result).to.be.false;
		expect(saveLogStub).to.have.been.calledWith(input);
	});

	it("[SUCCESS] Should return true when the text is a valid number", async () => {
		const input = {
			text: "2000",
			type: "number",
		};

		saveLogStub.withArgs(input).returns({});

		const result = await checkText(input);

		expect(result).to.be.true;
		expect(saveLogStub).to.have.been.calledWith(input);
	});

	it("[SUCCESS] Should return false when the text is a invalid number", async () => {
		const input = {
			text: "asdasd",
			type: "number",
		};

		saveLogStub.withArgs(input).returns({});

		const result = await checkText(input);

		expect(result).to.be.false;
		expect(saveLogStub).to.have.been.calledWith(input);
	});
});
