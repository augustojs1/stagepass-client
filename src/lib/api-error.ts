/* eslint-disable @typescript-eslint/no-explicit-any */
export class APIError extends Error {
  body: any;
  statusCode: number;

  constructor(status: number, body: any) {
    super(body?.message || "Request failed");
    this.statusCode = status;
    this.body = body;
  }
}
