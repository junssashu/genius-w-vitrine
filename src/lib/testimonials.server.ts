import { testimonials as INITIAL, type Testimonial } from "./testimonials";
import { readJsonFile, writeJsonFile } from "./data-store";

export function getTestimonials(): Testimonial[] {
  return readJsonFile<Testimonial>("testimonials.json", INITIAL);
}

export function saveTestimonials(data: Testimonial[]): void {
  writeJsonFile("testimonials.json", data);
}
