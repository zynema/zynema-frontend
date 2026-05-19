export type Film = {
  id: number;
  title: string;
  genre: string;
  parent_genre: string;
  imdb_score: string;
  poster: string;
};

export type RecommendationsResponse = {
  data: Film[];
  status: string;
};
