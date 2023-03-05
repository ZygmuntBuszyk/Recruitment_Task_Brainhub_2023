import express from 'express';
import bodyParser from 'body-parser';
import config from './config';
import { bootstrapModules } from './modules';
import { errors } from 'celebrate';
import { InitDatabase } from './lib/db/initLocalDatabase';

const cors = require('cors');

export const app = express();

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use(cors());
app.options('*', cors());
app.enable('trust proxy');
app.use(express.json());
// Celebrate handles request validation errors based on joi validators.
app.use(errors());

(async function () {
	if (config.NODE_ENV !== 'test') {
		await InitDatabase();
	}

	await bootstrapModules(app);

	app.listen(config.PORT, () => {
		console.info(`Server listening on port ${config.PORT}) `);
	});
})().catch(e => {
	console.error('Server error');
	console.error(e);
	process.exit(1);
});
