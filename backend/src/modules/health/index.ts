import { IRouterDefinition } from '../index';
import { healthRouter } from './health.router';

const healthRouterDefinition: IRouterDefinition = { path: '/status', router: healthRouter };

export default healthRouterDefinition;
