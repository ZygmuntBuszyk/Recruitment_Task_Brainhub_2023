import { Router } from 'express';
import { isHealthy } from './health.service';

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
	const health = isHealthy();
	if (health) {
		res.status(200);
	} else {
		res.status(503);
	}
	res.send();
});

export { healthRouter };
