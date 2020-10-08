export default class FlashMessageError extends Error {
	name: string;
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		this.stack = new Error(message).stack;
	}
}
