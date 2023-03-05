import { MySQLDatabaseHelper } from '../lib/db/MySqlDbHelper';
import config from '../config';

module.exports = async () => {
	console.debug('\n', '► Setting up testing database...', '\n');

	const mySqlInstance = new MySQLDatabaseHelper(config.TEST_DATABASE_URL!, config.TEST_DATABASE_NAME!);

	await mySqlInstance.onInit();
};
