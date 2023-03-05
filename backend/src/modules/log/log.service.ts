import { celebrate, Joi, Segments } from 'celebrate';
import { DatabaseTable, useStore } from '../../lib/db/datastore';
import * as uuid from 'uuid';

enum LogType {
	WARNING = 'W',
	ERROR = 'E',
	INFO = 'I'
}

export interface ILogRequest {
	name: string;
	email: string;
	log: string;
}

export const relevantSeverinityNumber: number = 50;

export const getRelevantSevernityNumber = (severity: number) => severity >= relevantSeverinityNumber;

export const getRelevantLines = (processedLog: string): string => {
	const processedLogLines: string[] = processedLog.split('\n');

	const errorLines = processedLogLines.filter(line => line.startsWith(LogType.ERROR));

	const filteredErrorLines = errorLines.filter(line => {
		const severity = parseInt(line.split(' ')[2]);

		return getRelevantSevernityNumber(severity);
	});

	return filteredErrorLines.join('\n');
};

export const processTheLog = (log: string) => {
	const filteredLines = getFilteredLines(log);

	const sortedLines = sortByAscendingOrder(filteredLines);

	return sortedLines.join('\n');
};

export const saveLogData = async (logData: ILogRequest): Promise<void> => {
	try {
		console.info(`→ Saving log data to the database`);
		const store = await useStore();

		const table = store.table<ILogRequest>(DatabaseTable.LOG);

		const id = uuid.v4();

		await table.write(id, logData);
		console.info(`→ Log record was successfully saved in the database.} `);
	} catch (e) {
		console.info(`→ Failed to save log data in the database`);
		console.error(e);
		throw e;
	}
};

export const isNonAscii = (line: string) => !/^[\x00-\x7F]*$/.test(line);

export const getFilteredLines = (log: string): string[] => {
	const allLines: string[] = log.split('\n');

	return allLines.filter(line => (Object.values(LogType) as string[]).includes(line[0]) && line[1] === ' ' && !isNonAscii(line));
};

export const sortByAscendingOrder = (filteredLines: string[]): string[] => {
	return filteredLines.sort((a, b) => {
		const aTimeStamp = parseInt(a.split(' ')[1]);
		const bTimeStamp = parseInt(b.split(' ')[1]);
		return aTimeStamp - bTimeStamp;
	});
};

export const logValidationMiddleware = () =>
	celebrate({
		[Segments.BODY]: Joi.object({
			name: Joi.string().required(),
			email: Joi.string().required().email(),
			log: Joi.string().required()
		})
	});

// TODO unit test all of those
export default {
	processTheLog,
	getRelevantLines,
	saveLogData,
	logValidationMiddleware,
	sortByAscendingOrder,
	getFilteredLines,
	isNonAscii,
	getRelevantSevernityNumber
};
