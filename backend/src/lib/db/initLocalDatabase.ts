import { MySQLDatabaseHelper } from './MySqlDbHelper';
import config from '../../config';

export async function InitDatabase() {
	try {
		console.info(`→ Initiating Mysql Database`);

		const mySqlInstance = new MySQLDatabaseHelper(config.DATABASE_URL!, config.DATABASE_NAME!);

		await mySqlInstance.onInit();
		console.info(`→ SUCCESS`);
	} catch (e) {
		console.error(e);
		process.exit(-1);
	}
}
