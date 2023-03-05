// @ts-ignore
import defaultConfig from '../../jest.config';

/**
 * Configuration for Integration Tests
 */

export default {
	...defaultConfig,
	setupFiles: ['./setup.ts'],
	globalSetup: './globalSetup.ts',
	testMatch: ['./**/*.(spec|test).ts']
};
