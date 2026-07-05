import { copyFileSync, cpSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const distDir = join(rootDir, "dist");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });

for (const file of ["index.html", "styles.css", "script.js"]) {
  copyFileSync(join(rootDir, file), join(distDir, file));
}

cpSync(join(rootDir, "public"), join(distDir, "public"), { recursive: true });

console.log("Built MilfDonalds static site to dist/");
