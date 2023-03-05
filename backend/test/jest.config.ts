/**
 * Configuration for Integration Tests
 */
import defaultConfig from "../jest.config";

export default {
    ...defaultConfig,
    setupFiles: ["./setup.ts"],
    globalSetup: "./globalSetup.ts",
    testMatch: ["./**/*.(spec|test).ts"],
};
