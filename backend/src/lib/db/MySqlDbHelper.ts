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
		await this.dropTestDatabase();
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

	private async createDatabase() {
		console.debug('→ Creating MySQL database...');

		const connectionToMySQLHost = await mysql.createConnection({
			uri: `${this._databaseUrl}`
		});

		console.debug('✔︎ Connected to MySQL');

		await connectionToMySQLHost.execute(`CREATE DATABASE IF NOT EXISTS ${config.DATABASE_NAME}`);

		console.debug(`✔︎ Database created: "${config.DATABASE_NAME}"`);

		await connectionToMySQLHost.end();
		const connectionToMySQLHostDatabase = await mysql.createConnection({
			uri: `${this._databaseUrl}/${this._databaseName}`
		});

		console.debug('✔︎ Test database selected');

		const schema = fs
			.readFileSync('./database/schema.sql', 'utf8')
			.split(/^\n/gm)
			.filter(statement => statement.trim());
		const schemaStatementPromises = schema.map((statement: string) => connectionToMySQLHostDatabase.execute(statement));
		await Promise.all(schemaStatementPromises);
		await connectionToMySQLHostDatabase.destroy();

		console.debug('✔︎ Schema created');
		console.debug('✔︎ MySQL setup completed!', '\n');
	}

	private async dropTestDatabase() {
		console.debug('→ Dropping MySQL test database...');

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
