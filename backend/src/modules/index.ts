import type { Express } from 'express';
import { Router } from 'express';
import logRouterDefinition from './log';
import healthRouterDefinition from './health';

export interface IRouterDefinition {
	path: string;
	router: Router;
}

const routerDefinitions: IRouterDefinition[] = [logRouterDefinition, healthRouterDefinition];

export async function bootstrapModules(app: Express) {
	console.info('→ Bootstraping in progress.');

	for (const routerDefinition of routerDefinitions) {
		const { path, router } = routerDefinition;

		console.info(`→ Attaching router to path "${path}"... `);
		await app.use(path, router);

		console.info(`→ SUCCESS → Bootstraping modules was completed.`);
	}
}
