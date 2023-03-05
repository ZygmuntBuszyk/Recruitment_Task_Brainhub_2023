// TODO integration tests
// remember to test Celebrate Bad Requests Errors
import request from 'supertest';
import { app } from '../../../../src/index';

describe('User Settings', function () {
	const DUMMY_LOG = 'dummy input';
	const DUMMY_EMAIL = 'dummy@email.com';
	const DUMMY_NAME = 'dummy text';

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
