export type Category = {
  id: number;
  name: string;
};

export type CategoriesResponse = {
  data: Category[];
  status: string;
};