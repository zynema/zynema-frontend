export type Film = {
  id: number;
  title: string;
  parent_genre: string;
  imdb_score: number;
  poster: string;
  premiere: string;
  primary_language: string;
  runtime: number;
  similarity_score: number;
};

export type RecommendationsResponse = {
  data: Film[];
  status: string;
};
