export type Product = {
  id: string;
  name: string;
  category: string;
}

export interface ProductListProps {
  title?: string;
  onClick?: (item: Product) => void;
}
