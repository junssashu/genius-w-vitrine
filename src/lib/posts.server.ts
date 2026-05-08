import { posts as INITIAL, type Post } from "./posts";
import { readJsonFile, writeJsonFile } from "./data-store";

export function getPosts(): Post[] {
  return readJsonFile<Post>("posts.json", INITIAL);
}

export function findPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function savePosts(data: Post[]): void {
  writeJsonFile("posts.json", data);
}
