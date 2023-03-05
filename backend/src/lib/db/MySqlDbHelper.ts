import mysql from 'mysql2/promise';
import fs from 'fs';
import config from '../../config';

interface IDatabaseHelper {
	onInit: () => Promise<unknown> | unknown;
}

export class MySQLDatabaseHelper implements IDatabaseHelper {
	private _connection: mysql.Connection | null = null;
	private readonly _databaseUrl: string;
	private readonly _databaseName: string;

	public constructor(databaseUrl: string, databaseName: string) {
		this._databaseUrl = databaseUrl;
		this._databaseName = databaseName;
	}

	public async onInit() {
		await this.createDatabase();
	}

	public async onTestInit() {
		await this.dropDatabase();
		await this.createDatabase();
	}

	public async getDatabaseConnection() {
		if (!this._connection) {
			this._connection = await mysql.createConnection({
				uri: `${this._databaseUrl}/${this._databaseName}`
			});
		}

		return this._connection;
	}

	private failOnDev() {
		if (this._databaseName === config.DATABASE_NAME) {
			throw new Error('This operation cannot be run in development/prod lol');
		}
	}

	private async createDatabase() {
		console.debug('→ Creating MySQL database...');

		const connectionToMySQLHost = await mysql.createConnection({
			uri: `${this._databaseUrl}`
		});

		console.debug('✔︎ Connected to MySQL');

		await connectionToMySQLHost.execute(`CREATE DATABASE IF NOT EXISTS ${this._databaseName}`);

		console.debug(`✔︎ Database created: "${this._databaseName}"`);

		await connectionToMySQLHost.end();
		const connectionToMySQLHostDatabase = await mysql.createConnection({
			uri: `${this._databaseUrl}/${this._databaseName}`
		});

		console.debug('✔︎ Test database selected');

		const schema = fs.readFileSync('./src/lib/db/schema.sql', 'utf8').trim();

		try {
			console.debug(`→ Initiating database Schemas`);
			await connectionToMySQLHostDatabase.execute(schema);

			console.debug('✔︎ Schema was created');
		} catch (e) {
			console.debug(`⚠️ There was a problem while create a schema `);
			throw e;
		}

		await connectionToMySQLHostDatabase.destroy();
		console.debug('✔︎ MySQL setup completed!', '\n');
	}

	private async dropDatabase() {
		this.failOnDev();

		console.debug('→ Dropping MySQL database...');

		try {
			const conn = await this.getDatabaseConnection();
			await conn.execute(`DROP SCHEMA IF EXISTS ${this._databaseName}`);
			await conn.destroy();
			console.debug('✔︎ Test database deleted!');
		} catch (e) {
			console.debug(`⚠️ ${(e as Error).message}`);
		}
	}
}
