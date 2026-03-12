/**
 * Test runner for my trivial server app.
 *
 * Test structure overview:
 * 1. GET /root > Should return app name, author, version and uptime
 *
 * @author Tegar Wijaya Kusuma
 * @date 13 March 2026
 */

import { describe, expect, it, beforeEach } from "bun:test";
import { app } from "../index.ts";
import { HEALTH_DEGRADED } from "../index.ts";

const BASE_URL = Bun.env.BASE_URL ?? "http://localhost:3000";
let HEALTH_DEGRADED = true;

describe("TESTING SERVER", () => {
	it("Should return headers", async () => {
		const response = await app.handle(new Request(`${BASE_URL}`));

		expect(response.headers.get("X-Powered-By")).toBe("Elysia + Bun + Railway");
	});

	describe("GET /root", () => {
		it("Should return app name, author, version and uptime", async () => {
			const response = await app.handle(new Request(`${BASE_URL}`));

			const data = await response.json();
			expect(data).toHaveProperty("app", "Docker-Mastery");
			expect(data).toHaveProperty("author", "Tegar Wijaya Kusuma");
			expect(data).toHaveProperty("version", "v1");
			expect(data).toHaveProperty("uptime");
			expect(typeof data.uptime).toBe("string");
		});
	});

	describe("GET /health", () => {
		it("Should return status: ok with 200", async () => {
			const response = await app.handle(new Request(`${BASE_URL}/health`));

			expect(response.status).toBe(200);
			const data = await response.json();
			expect(data).toEqual({
				status: "ok",
			});
		});
	});

	// TODO: Add GET /echo
});
