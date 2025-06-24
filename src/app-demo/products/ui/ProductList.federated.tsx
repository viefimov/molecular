import { ProductListProps, ProductListView } from '@/app-demo/products/ui/ProductListView.tsx';
import { useEffect, useState } from 'react';
import { Product } from '@/app-demo/products/types.ts';
import { getProducts } from '@/app-demo/products/api/client.api.ts';


export function ProductList({ title = 'List', onClick }: Omit<ProductListProps, "items">) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then(({items}) => setItems(items))
      .catch(console.error);
  }, []);

  return <ProductListView title={title} items={items} onClick={onClick} />
}
