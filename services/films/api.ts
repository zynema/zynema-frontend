import { RecommendationsResponse, FilmDetailResponse } from "./type";

const BASE_URL = "/api/proxy";

export async function getRecommendations(
  categories: string[]
): Promise<RecommendationsResponse> {
  const params = new URLSearchParams();
  categories.forEach((cat) => {
    // Capitalize first letter to match API format
    const capitalized = cat.charAt(0).toUpperCase() + cat.slice(1);
    params.append("category", capitalized);
  });

  const res = await fetch(`${BASE_URL}/recommendations?${params.toString()}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch recommendations: ${res.status}`);
  }

  return res.json();
}

export async function getFilmById(id: number): Promise<FilmDetailResponse> {
  const res = await fetch(`${BASE_URL}/films/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch film: ${res.status}`);
  }

  return res.json();
}
