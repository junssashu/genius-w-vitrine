import { services as INITIAL, type Service } from "./services";
import { readJsonFile, writeJsonFile } from "./data-store";

export function getServices(): Service[] {
  return readJsonFile<Service>("services.json", INITIAL);
}

export function saveServices(data: Service[]): void {
  writeJsonFile("services.json", data);
}
