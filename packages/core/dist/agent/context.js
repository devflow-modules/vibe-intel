import fg from "fast-glob";
import { promises as fs } from "node:fs";
import * as path from "node:path";
export async function loadFiles(pattern) {
    const files = await fg(pattern, { absolute: true });
    const contents = [];
    for (const file of files) {
        const text = await fs.readFile(file, "utf8");
        contents.push(`// file: ${path.relative(process.cwd(), file)}\n${text}`);
    }
    return contents;
}
