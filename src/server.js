const http = require("node:http");

function handleRequest(req, res) {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Node.js app is running",
        version: process.env.APP_VERSION || "dev"
      })
    );
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
}

function buildApp() {
  return http.createServer(handleRequest);
}

function startServer(port = Number(process.env.PORT) || 3000) {
  const server = buildApp();

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { buildApp, handleRequest, startServer };
