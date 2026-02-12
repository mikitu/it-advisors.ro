const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");
const path = require("path");

// Log file path
const logFile = path.join(__dirname, "server.log");

// Logger function
function log(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}${data ? " " + JSON.stringify(data) : ""}\n`;

  // Write to file
  fs.appendFileSync(logFile, logMessage);

  // Also write to console
  console.log(logMessage.trim());
}

// Clear old log on startup
fs.writeFileSync(logFile, `=== Server starting at ${new Date().toISOString()} ===\n`);

log("INFO", "Environment variables:", {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  HOSTNAME: process.env.HOSTNAME,
  NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
});

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

log("INFO", `Starting Next.js app`, { dev, hostname, port });

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    log("INFO", "Next.js app prepared successfully");

    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (err) {
        log("ERROR", `Error handling ${req.url}`, { error: err.message, stack: err.stack });
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    }).listen(port, hostname, (err) => {
      if (err) {
        log("ERROR", "Failed to start server", { error: err.message });
        throw err;
      }
      log("INFO", `Server ready on http://${hostname}:${port}`);
    });
  })
  .catch((err) => {
    log("ERROR", "Failed to prepare Next.js app", { error: err.message, stack: err.stack });
    process.exit(1);
  });

