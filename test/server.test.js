const test = require("node:test");
const assert = require("node:assert/strict");
const { handleRequest } = require("../src/server");

async function request(pathname) {
  const req = { url: pathname };
  const res = {
    statusCode: 200,
    headers: {},
    body: "",
    writeHead(statusCode, headers) {
      this.statusCode = statusCode;
      this.headers = headers;
    },
    end(payload) {
      this.body = payload;
    }
  };

  await handleRequest(req, res);

  return {
    status: res.statusCode,
    body: JSON.parse(res.body)
  };
}

test("GET / returns the app status payload", async () => {
  const response = await request("/");

  assert.equal(response.status, 200);
  assert.equal(response.body.message, "Node.js app is running");
});

test("GET /healthz returns ok", async () => {
  const response = await request("/healthz");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("unknown routes return 404", async () => {
  const response = await request("/missing");

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, { error: "Not found" });
});
