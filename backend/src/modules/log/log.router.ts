import type { Request } from 'express';
import { Router } from 'express';
import { getRelevantLines, ILogRequest, logValidationMiddleware, processTheLog, saveLogData } from './log.service';
import { RequestException } from '../../lib/RequestException';
import { HttpStatusCode } from '../../types/HttpStatusCode';

const logRouter = Router({});

logRouter.post('/', logValidationMiddleware(), async (req: Request, res) => {
	const { body: logData }: { body: ILogRequest } = req;

	try {
		const processedLog = processTheLog(logData.log);

		if (!processedLog) {
			throw new RequestException({
				message: `The log is incorrect. Log should have Severity indicator prepending the timestamp and  contextual message.`,
				status: HttpStatusCode.BAD_REQUEST
			});
		}

		await saveLogData({ ...logData, log: processedLog } as ILogRequest);

		const relevantLines = getRelevantLines(processedLog);

		return res.status(HttpStatusCode.CREATED).send(relevantLines);
	} catch (error: any) {
		return res.status(error?.status || HttpStatusCode.INTERNAL_SERVER_ERROR).send({ error: error?.message || 'Internal Server Error' });
	}
});

export { logRouter };
