import api from '../api';
import { appApiRoutes } from '../apiRoutes';
import { ILogRequest, ILogResponse } from '@/services/api/apiModels/log';
import { AxiosError } from 'axios';

const processLog = async (values: ILogRequest): Promise<ILogResponse> => {
	return new Promise((resolve, reject) =>
		api
			.post(appApiRoutes.log, values)
			.then(response => {
				resolve({ data: response.data, status: response.status });
			})
			.catch((err: AxiosError) => {
				reject(err);
			})
	);
};

export default processLog;
