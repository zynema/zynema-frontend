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

export type FilmDetail = {
  id: number;
  title: string;
  genre: string;
  main_parent_genre: string;
  parent_genre: string;
  imdb_score: string;
  poster: string;
  premiere: string;
  primary_language: string;
  runtime: string;
  year_premiere: string;
  director: string;
  plot: string;
};

export type RecommendationsResponse = {
  data: Film[];
  status: string;
};

export type FilmDetailResponse = {
  data: FilmDetail;
  status: string;
};
