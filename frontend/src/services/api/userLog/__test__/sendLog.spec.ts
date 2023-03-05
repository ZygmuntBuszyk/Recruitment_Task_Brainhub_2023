import axios, { AxiosError } from 'axios';
import api from '@/services/api/api';
import processLog from '@/services/api/userLog/sendLog';
import { ILogRequest, ILogResponse } from '@/services/api/apiModels/log';

jest.mock('@/services/api/api');
const axiosMock = api as jest.Mocked<typeof axios>;

describe('processLog', () => {
	it('Should call Post request with correct values and receive correct response', async function () {
		axiosMock.post.mockImplementationOnce(() => Promise.resolve(DUMMY_LOG_RESPONSE));

		const response = await processLog(DUMMY_LOG_REQUEST);

		expect(axiosMock.post).toHaveBeenCalledWith('/log', DUMMY_LOG_REQUEST);
		expect(response).toEqual(DUMMY_LOG_RESPONSE);
	});

	it('Should cover negative route after error is thrown', async function () {
		const DUMMY_AXIOS_ERROR = { message: 'dummy error' } as AxiosError;
		axiosMock.post.mockImplementationOnce(() => Promise.reject(DUMMY_AXIOS_ERROR));

		await processLog(DUMMY_LOG_REQUEST).catch(e => expect(e).toEqual(DUMMY_AXIOS_ERROR));
	});
});

const DUMMY_LOG_REQUEST: ILogRequest = {
	name: 'string',
	email: 'email@email.com',
	log: 'string'
};

const DUMMY_LOG_RESPONSE: ILogResponse = {
	data: '',
	status: 200
};
