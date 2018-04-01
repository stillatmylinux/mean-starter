export class User {
	
	public id: string;

	constructor(
		public email: string,
		public password: string,
		public firstName?: string,
		public lastName?: string,
		public image?: string,
		public tokens?: number
	) {}
}