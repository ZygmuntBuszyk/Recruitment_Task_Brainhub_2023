import { useCallback, useState } from 'react';
import { ILogRequest, ILogResponse } from '@/services/api/apiModels/log';
import processLog from '@/services/api/userLog/sendLog';

const useFormHandle = (): [(values: ILogRequest, callback: Function) => Promise<void>, string, boolean] => {
	const [isLoading, setIsLoading] = useState(false);
	const [log, setLog] = useState<string>('');

	const onSubmit = useCallback(async (values: ILogRequest, callback: Function) => {
		setIsLoading(true);

		try {
			const response: ILogResponse = await processLog(values);

			setLog(response.data || 'There were no Relevant lines in the log.');

			callback();
		} catch (error: any) {
		} finally {
			setIsLoading(false);
		}
	}, []);

	return [onSubmit, log, isLoading];
};
export default useFormHandle;
