/**
 * Global configuration & unit tests
 */
declare const config: {
    preset: string;
    testEnvironment: string;
    moduleFileExtensions: string[];
    testPathIgnorePatterns: string[];
    testMatch: string[];
    testTimeout: number;
    clearMocks: boolean;
    moduleNameMapper: {
        '\\.(html)$': string;
    };
};
export default config;
