import { ProductListProps } from './types.ts';
import { FunctionComponent } from 'react';

export type CatalogViewProps = {
  di: {
    ProductList: FunctionComponent<ProductListProps>;
  }
}

export function CatalogView({ di }: CatalogViewProps) {
  const { ProductList } = di;
  return <div data-testid="CatalogView">
    <nav>
      <button>All</button>
      <button>Electronics</button>
      <button>Sport</button>
      <button>Toys</button>
    </nav>
    <main>
      <ProductList title="Electronics" onClick={console.log} />
    </main>
  </div>
}
