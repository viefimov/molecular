import { Product } from '@/app-demo/products/types.ts';

export interface ProductListProps {
  title?: string;
  items: Product[];
  onClick?: (item: Product) => void;
}

export function ProductListView({ title = 'List', items, onClick }: ProductListProps) {
  return <div data-testid="ProductList">
    <p>{title}</p>
    <ul>{items.map(item => <li key={item.id} onClick={() => onClick?.(item)}>
      {item.name}
    </li>)}</ul>
  </div>
}
