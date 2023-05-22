import { checkText } from "../../src/controllers/checkText.controller";
import { expect, sinon } from "../chai.config.js";
import BusinessLogic from "../../src/business-logic/index.js";
import { BusinessError, ServerError } from "../../src/helpers/error.helper";

describe("Controller: Check text unit test", () => {
	const { any } = sinon.match;

	const mockResponse = () => {
		const res = {};
		res.status = sinon.stub().returns(res);
		res.send = sinon.stub().returns(res);
		return res;
	};

	let checkTextBusinessLogicStub;

	beforeEach(() => {
		checkTextBusinessLogicStub = sinon.stub(BusinessLogic, "checkText");
	});

	afterEach(() => {
		checkTextBusinessLogicStub.restore();
	});

	it("[ERROR] When the type doesnt exists in the body throw error", async () => {
		const req = {
			body: {
				text: "text",
			},
		};

		const res = mockResponse();

		await checkText(req, res);
		expect(res.status).to.be.calledWith(400);
		expect(res.send).to.be.calledWith({ error: any });
		expect(checkTextBusinessLogicStub).to.not.be.called;
	});

	it("[ERROR] When the text doesnt exists in the body throw error", async () => {
		const req = {
			body: {
				type: "type",
			},
		};

		const res = mockResponse();

		await checkText(req, res);
		expect(res.status).to.be.calledWith(400);
		expect(res.send).to.be.calledWith({ error: any });
		expect(checkTextBusinessLogicStub).to.not.be.called;
	});

	it("[SUCCESS] Should return true when BusinessLogic.checkText return true", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};

		const res = mockResponse();

		checkTextBusinessLogicStub.withArgs(req.body).returns(true);

		await checkText(req, res);
		expect(res.status).to.be.calledWith(200);
		expect(res.send).to.be.calledWith(true);
		expect(checkTextBusinessLogicStub).to.be.calledWith(req.body);
	});

	it("[SUCCESS] Should return false when BusinessLogic.checkText return false", async () => {
		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};
		const res = mockResponse();

		checkTextBusinessLogicStub.withArgs(req.body).returns(false);

		await checkText(req, res);
		expect(res.send).to.be.calledWith(false);
		expect(res.status).to.be.calledWith(200);
		expect(checkTextBusinessLogicStub).to.be.calledWith(req.body);
	});

	it("[ERROR] Should return a ServerError when checkText logic throw a ServerError", async () => {
		const serverError = new ServerError("error");

		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};
		const res = mockResponse();

		checkTextBusinessLogicStub.withArgs().rejects(serverError);

		await checkText(req, res);

		expect(res.status).to.be.calledWith(500);
		expect(res.send).to.be.calledWith({ error: any });
		expect(checkTextBusinessLogicStub).to.be.calledWith(req.body);
	});

	it("[ERROR] Should return a BusinessError when checkText logic throw a BusinessError", async () => {
		const businessError = new BusinessError("error");

		const req = {
			body: {
				type: "type",
				text: "text",
			},
		};
		const res = mockResponse();

		checkTextBusinessLogicStub.withArgs(req.body).rejects(businessError);

		await checkText(req, res);

		expect(res.status).to.be.calledWith(400);
		expect(res.send).to.be.calledWith({ error: businessError });
		expect(checkTextBusinessLogicStub).to.be.calledWith(req.body);
	});
});
