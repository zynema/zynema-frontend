import { DirectorsResponse } from "./type";

const BASE_URL = "/api/proxy";

export async function getDirectors(): Promise<DirectorsResponse> {
  const res = await fetch(`${BASE_URL}/directors`);

  if (!res.ok) {
    throw new Error(`Failed to fetch directors: ${res.status}`);
  }

  return res.json();
}
