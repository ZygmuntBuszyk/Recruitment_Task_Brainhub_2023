const config = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom', // node
	coverageReporters: ['json', 'text', 'lcov', 'clover'],
	testPathIgnorePatterns: ['/node_modules/', '<rootDir>/.next/'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'd.ts'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.jest.json'
		}
	},
	moduleNameMapper: {
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
		'\\.(css|less|scss)$': 'identity-obj-proxy',
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	verbose: true,
	clearMocks: true,
	testTimeout: 30000,
	coverageDirectory: 'coverage',
	collectCoverage: true,
	reporters: ['default', ['jest-junit', { outputDirectory: 'test-reports' }]],
	setupFiles: ['./test/config.ts']
};

module.exports = config;
