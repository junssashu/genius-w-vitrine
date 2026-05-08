import { portfolio as INITIAL, type Look } from "./portfolio";
import { readJsonFile, writeJsonFile } from "./data-store";

export function getPortfolio(): Look[] {
  return readJsonFile<Look>("portfolio.json", INITIAL);
}

export function findLook(slug: string): Look | undefined {
  return getPortfolio().find((l) => l.slug === slug);
}

export function savePortfolio(data: Look[]): void {
  writeJsonFile("portfolio.json", data);
}
