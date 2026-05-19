import { CategoriesResponse } from "./type";

const BASE_URL = "/api/proxy";

export async function getCategories(): Promise<CategoriesResponse> {
  const res = await fetch(`${BASE_URL}/categories`);

  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status}`);
  }

  return res.json();
}
