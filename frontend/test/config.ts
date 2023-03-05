/**
 * Place for setting up repeatable configurations.
 * Each setupFile(config.ts in this situation) will be run once per test file.
 */

/** https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom  */
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(),
		removeListener: jest.fn(),
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn()
	}))
});

export {};
