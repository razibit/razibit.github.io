import fs from "node:fs";
import path from "node:path";

export function getAboutContent(): string {
  const filePath = path.join(process.cwd(), "content", "about.md");
  return fs.readFileSync(filePath, "utf8").trim();
}
