import { IRouterDefinition } from '../index';
import { logRouter } from './log.router';
import config from '../../config';

const logRouterDefinition: IRouterDefinition = { path: `${config.API_PREFIX}/log`, router: logRouter };

export default logRouterDefinition;
