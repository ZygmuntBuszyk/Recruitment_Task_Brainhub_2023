import { useCallback, useState } from 'react';
import { ILogRequest, ILogResponse } from '@/services/api/apiModels/log';
import processLog from '@/services/api/userLog/sendLog';

const useFormHandle = (): [(values: ILogRequest, callback: Function) => Promise<void>, string, boolean] => {
	const [isLoading, setIsLoading] = useState(false);
	const [log, setLog] = useState('');

	const onSubmit = useCallback(async (values: ILogRequest, callback: Function) => {
		setIsLoading(true);

		try {
			const response: ILogResponse = await processLog(values);

			setLog(response.data);

			callback();
		} catch (error: any) {
			throw new Error(error?.message || error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	return [onSubmit, log, isLoading];
};
export default useFormHandle;
