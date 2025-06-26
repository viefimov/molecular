export type Product = {
  id: string;
  name: string;
  category: string;
}

export type ProductListFilter = {
  category?: string;
  search?: string;
}
