/**
 * Business Error (400) class
 */
class BusinessError extends Error {
	constructor(name, msg) {
		super();
		this.name = name;
		this.msg = msg;
		this.statusCode = 400;
	}
}

/**
 * Business Error (500) class
 */
class ServerError extends Error {
	constructor(name, msg) {
		super();
		this.name = name;
		this.msg = msg;
		this.statusCode = 500;
	}
}

export { BusinessError, ServerError };
