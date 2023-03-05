import { config } from 'dotenv';

const envFound = config();

if (envFound.error) {
	throw new Error(" Couldn't find .env file");
}

export default {
	PORT: process.env.PORT || 5000,
	DATABASE_URL: process.env.DATABASE_URL,
	DATABASE_NAME: process.env.DATABASE_NAME,
	TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
	NODE_ENV: process.env.NODE_ENV,
	TEST_DATABASE_NAME: process.env.TEST_DATABASE_NAME,
	API_PREFIX: '/api'
};
