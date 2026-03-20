/**
 * New ValidationError interface for test runner
 *
 * @author Tegar Wijaya Kusuma
 * @date 20 March 2026
 */

const APP_VERSION = "v2";

export interface ElysiaValidationError {
	type: "validation";
	on: "params" | "body" | "query" | "headers";
	property: string;
	errors: unknown[];
}

export interface WildcardError {
	error: string;
	timestamp: string;
	availableEndpoints: string[];
}

export interface AllError {
	error: string;
	timestamp: string;
}

export const availableEndpointsArray = ["GET /", "GET /health", "POST /echo"];

export interface RootResponse {
	app: string;
	author: string;
	version: string;
	date: string;
	uptime: string;
}

export const RootHandler: RootResponse = {
	app: "Status-API",
	author: "Tegar Wijaya Kusuma",
	version: `${APP_VERSION}`,
	date: `${new Date().toISOString()}`, // ISO 8601 format
	uptime: `${Math.floor(process.uptime())}`, // Uptime in seconds
};
