import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const serveDir = join(rootDir, process.argv[2] || ".");
const port = Number(process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png"
};

function resolveRequestPath(url) {
  const decodedPath = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const cleanPath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = join(serveDir, cleanPath);

  if (existsSync(requestedPath) && statSync(requestedPath).isDirectory()) {
    return join(requestedPath, "index.html");
  }

  return requestedPath;
}

createServer((request, response) => {
  const filePath = resolveRequestPath(request.url || "/");

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "Content-Type": types[extname(filePath)] || "application/octet-stream"
  });
  createReadStream(filePath).pipe(response);
}).listen(port, () => {
  console.log(`MilfDonalds is sizzling at http://localhost:${port}`);
});
