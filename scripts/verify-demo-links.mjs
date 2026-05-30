import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const registryPath = path.join(root, "src", "data", "projects.ts");
const source = await readFile(registryPath, "utf8");

const objectBlocks = source.match(/\{\n    id: [\s\S]*?\n  \}/g) ?? [];
const demos = objectBlocks
  .map((block) => {
    const id = block.match(/id: "([^"]+)"/)?.[1];
    const demoUrl = block.match(/demoUrl: "([^"]+)"/)?.[1];
    const demoStatus = block.match(/demoStatus: "([^"]+)"/)?.[1];
    return id && demoUrl && demoStatus ? { id, demoUrl, demoStatus } : null;
  })
  .filter(Boolean);

if (demos.length === 0) {
  console.log("No demo URLs found in project registry.");
  process.exit(0);
}

let failed = false;

for (const demo of demos) {
  if (demo.demoStatus !== "verified") {
    console.log(`pending: ${demo.id} -> ${demo.demoUrl}`);
    continue;
  }

  try {
    const response = await fetch(demo.demoUrl, { redirect: "follow" });
    if (response.status >= 200 && response.status <= 399) {
      console.log(`verified: ${demo.id} -> ${demo.demoUrl} (${response.status})`);
    } else {
      failed = true;
      console.error(`failed: ${demo.id} -> ${demo.demoUrl} (${response.status})`);
    }
  } catch (error) {
    failed = true;
    console.error(`failed: ${demo.id} -> ${demo.demoUrl} (${error.message})`);
  }
}

if (failed) {
  process.exit(1);
}
