import { YearsResponse } from "./type";

const BASE_URL = "/api/proxy";

export async function getYears(): Promise<YearsResponse> {
  const res = await fetch(`${BASE_URL}/year-premiere`);

  if (!res.ok) {
    throw new Error(`Failed to fetch years: ${res.status}`);
  }

  return res.json();
}
