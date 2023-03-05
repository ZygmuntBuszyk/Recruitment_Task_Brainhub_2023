import type { Request } from 'express';
import { Router } from 'express';
import { getRelevantLines, ILogRequest, logValidationMiddleware, processTheLog, saveLogData } from './log.service';

const logRouter = Router({});

logRouter.post('/', logValidationMiddleware(), async (req: Request, res) => {
	const { body: logData }: { body: ILogRequest } = req;

	try {
		const processedLog = processTheLog(logData.log);

		await saveLogData({ ...logData, log: processedLog } as ILogRequest);

		const relevantLines = getRelevantLines(processedLog);

		return res.status(200).send(relevantLines);
	} catch (error) {
		return res.status(500).send((error as Error).message || 'Internal Server Error');
	}
});

export { logRouter };
