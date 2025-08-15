import "dotenv/config";
// biome-ignore lint/style/noNamespaceImport: jest-dom matchers need to be imported as namespace
import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

// Extend Vitest's expect with jest-dom matchers
expect.extend(matchers);

afterEach(() => {
	cleanup();
});
