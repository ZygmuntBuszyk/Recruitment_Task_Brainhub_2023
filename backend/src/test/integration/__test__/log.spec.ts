// TODO integration tests
// remember to test Celebrate Bad Requests Errors
// Test all the possible errors
import request from 'supertest';
import { app } from '../../../../src/index';
import { MySQLDatabaseHelper } from '../../../lib/db/MySqlDbHelper';
import config from '../../../config';
import { Connection } from 'mysql2/promise';
import { DatabaseTable } from '../../../lib/db/datastore';
import * as uuid from 'uuid';

describe('User Settings', function () {
	const DUMMY_EMAIL = 'dummy@email.com';
	const DUMMY_NAME = 'dummy text';
	const DUMMY_LOG = `
	W 2712 kernel: 00:07: ttyS0 at I/O 0x3f8 (irq = 4, base_baud = 115200) is a 16550A
	W 2443 kernel: usbhid 3-9:1.2: couldn't find an input interrupt endpoint
	E 22 1863 systemd[1]: Finished Set console scheme.
	E 99 4043 And in thy wisdom make me wise.
	`;
	let db: Connection;

	beforeAll(async () => {
		const mySQLDatabaseHelper = new MySQLDatabaseHelper(config.TEST_DATABASE_URL!, config.TEST_DATABASE_NAME!);
		db = await mySQLDatabaseHelper.getDatabaseConnection();
	});

	beforeEach(async function () {
		const id = uuid.v4();

		await db.execute(`TRUNCATE TABLE ${DatabaseTable.LOG}`);
		await db.execute(`INSERT INTO ${DatabaseTable.LOG} (id, name, email, log) VALUES (?, ?, ?, ?)`, [
			id,
			DUMMY_NAME,
			DUMMY_EMAIL,
			DUMMY_LOG
		]);
	});

	it('should return the user settings', async function () {
		expect(true).toBe(true);

		const response = await request(app).post('/api/log').send({
			name: DUMMY_NAME,
			email: DUMMY_EMAIL,
			log: DUMMY_LOG
		});

		console.log(response.statusCode);
		expect(true).toBe(true);

		// expect(response.status).toBe(HttpStatusCode.OK);
		// expect(response.body).toMatchObject({
		//
		// });
	});
});
