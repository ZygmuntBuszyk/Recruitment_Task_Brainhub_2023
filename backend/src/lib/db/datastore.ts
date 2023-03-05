import mysql, { RowDataPacket } from 'mysql2/promise';
import config from '../../config';
import { ILogRequest } from '../../modules/log/log.service';

export enum DatabaseTable {
	LOG = 'log'
}

export interface DataStoreLogRecord extends RowDataPacket {
	values: ILogRequest;
	id?: string;
}

export type Atomic = (execute: (connection: mysql.Connection) => void) => Promise<void>;

export interface TableOperations {
	write: (
		id: string | null,
		value: ILogRequest,
		connection?: mysql.Connection | (() => Promise<mysql.Connection>)
	) => Promise<DataStoreLogRecord[]>;
}

export interface DataStore {
	atomic: Atomic;
	table: <T = any>(tableName: string) => TableOperations;
	disconnect: () => Promise<void>;
	testConnection: () => Promise<void>;
}

async function getDatabaseUrl() {
	return `${config.DATABASE_URL}/${config.DATABASE_NAME}`;
}

let connectionPool: mysql.Pool | null = null;
let connection: mysql.PoolConnection | null = null;

export function useStore(): DataStore {
	async function getConnection(): Promise<mysql.PoolConnection> {
		try {
			console.info(`→ Establishing Db connection`);

			if (!connectionPool) {
				connectionPool = mysql.createPool({
					uri: await getDatabaseUrl()
				});
			}

			if (!connection) {
				console.debug('Getting DB connection from pool');
				connection = await connectionPool.getConnection();
				console.debug('Got connection from pool');
			}

			return connection;
		} catch (error) {
			console.error(`Failed to get DB connection from pool: ${(error as Error).message}`);
			throw error;
		}
	}

	const atomic = async (execute: (con: mysql.Connection) => void) => {
		const conn = await getConnection();

		await conn.beginTransaction();

		try {
			await execute(conn);
			await conn.commit();
		} catch (e) {
			console.error('Database operation failed. Transaction rolled back', {
				data: {
					error: e
				}
			});
			await conn.rollback();
			throw e;
		} finally {
			if (typeof conn.release === 'function') {
				await conn.release();
			} else {
				console.error('atomic table operation: could not release connection');
			}
		}
	};

	const table = (tableName: string): TableOperations => {
		return {
			write: (id, values: ILogRequest, con) => write(tableName, id, values, con ?? getConnection)
		};
	};

	async function disconnect() {
		if (connectionPool) {
			await connectionPool.end();
		}
		connectionPool = null;
		connection = null;
	}

	// TODO for status
	async function testConnection() {
		const conn = await getConnection();
		conn.release();
	}

	return {
		atomic,
		table,
		disconnect,
		testConnection
	};
}

export async function write(
	table: string,
	id: string | null,
	values: ILogRequest,
	connectionGetter?: mysql.Connection | (() => Promise<mysql.Connection>)
) {
	const { name, email, log } = values;
	const connection = typeof connectionGetter === 'function' ? await connectionGetter() : connectionGetter;

	const [rows] = await connection!.execute<DataStoreLogRecord[]>(`REPLACE INTO ${table} (id, name, email, log) VALUES (?, ?, ?, ?)`, [
		id,
		name,
		email,
		log
	]);

	return rows;
}
