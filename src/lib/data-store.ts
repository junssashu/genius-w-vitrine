import fs from "node:fs";
import path from "node:path";

const DATA_DIR = path.join(process.cwd(), "data");

export function readJsonFile<T>(filename: string, fallback: readonly T[]): T[] {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      writeJsonFile(filename, [...fallback]);
      return [...fallback];
    }
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [...fallback];
  }
}

export function writeJsonFile<T>(filename: string, data: T[]): void {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(
    path.join(DATA_DIR, filename),
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}
