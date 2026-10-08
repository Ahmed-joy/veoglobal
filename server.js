const http = require("http");

const PORT = process.env.PORT || 3000;
const startedAt = new Date();

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok" }));
  }

  if (req.url === "/api/info") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        message: "Hello from Railway!",
        node: process.version,
        env: process.env.RAILWAY_ENVIRONMENT_NAME || "local",
        startedAt: startedAt.toISOString(),
        time: new Date().toISOString(),
      })
    );
  }

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Railway Test</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,sans-serif;background:#1c1046;color:#fff;text-align:center}
    .box{padding:32px;border:1px solid rgba(255,255,255,.3);border-radius:16px;background:rgba(255,255,255,.08)}
    code{background:rgba(255,255,255,.15);padding:2px 8px;border-radius:6px}
  </style>
</head>
<body>
  <div class="box">
    <h1>🚀 Deploy successful!</h1>
    <p>GitHub → Railway kaj korche.</p>
    <p>Try: <code>/health</code> &nbsp; <code>/api/info</code></p>
  </div>
</body>
</html>`);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
