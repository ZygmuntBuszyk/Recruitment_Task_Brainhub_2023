/**
 * Global configuration & unit tests
 */

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "d.ts"],
    testPathIgnorePatterns: ["<rootDir>/node_modules"],
    testMatch: ["<rootDir>/**/__test__/*.(spec|test).ts"],
    reporters: [
        "default",
        ["jest-junit", { outputDirectory: "<rootDir>/test-reports" }],
    ],
    testTimeout: 30000,
    clearMocks: true,
    moduleNameMapper: {
        "\\.(html)$": "identity-obj-proxy",
    },
};

export default config;
